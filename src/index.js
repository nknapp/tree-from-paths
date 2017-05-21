/*!
 * tree-from-paths <https://github.com/nknapp/tree-from-paths>
 *
 * Copyright (c) 2017 Nils Knappmeier.
 * Released under the MIT license.
 */
const _ = {
  groupBy: require('lodash.groupby')
}
const archy = require('archy')

/**
 * Renders a list of files like
 *
 * ```
 * ['abc/cde/efg/', 'abc/cde/abc', 'abc/zyx']
 * ```
 *
 * as ascii-art tree (using [archy](https://www.npmjs.com/package/archy))
 *
 * @param {string[]} files an array of sorted file paths relative to `parent`
 * @param {string} baseDir the root path of the tree.
 * @param {function({parent:string, file:string, explicit: boolean}):string} renderLabelFn function that renders the label
 *  of a node. It receives the parent and a filenpath as parameters.
 * @param {object=} options optional parameters
 * @param {string=} options.label the label of the root node (default: '')
 *
 * @returns {string} am ascii-art tree
 * @access public
 */
function render (files, baseDir, renderLabelFn, options = {}) {
  baseDir = baseDir.replace(/\/$/, '/')
  const strippedFiles = files.map(file => {
    /* istanbul ignore else: Else-case should never happen */
    if (file.lastIndexOf(baseDir, 0) === 0) {
      return file.substr(baseDir.length)
    }
    /* istanbul ignore next: Should never happen */
    throw new Error('Basedir ' + baseDir + ' must be a prefix of ' + file)
  })
  const rootNode = treeFromPaths(strippedFiles, baseDir, renderLabelFn, options)
  const condensed = condense(rootNode)
  return archy(condensed)
}

/**
 * Transform an array of paths into an [archy](https://www.npmjs.com/package/archy)-compatible tree structure.
 *
 * ```
 * ['abc/cde/efg/', 'abc/cde/abc', 'abc/zyx']
 * ```
 * becomes
 * ```
 * {
 *   label: 'abc/',
 *   nodes: [{ label: 'cde/',nodes: ['efg/', 'abc']}, 'zyx']
 * }
 * ```
 *
 * Nodes with a single subnode are collapsed and the resulting node gets the label `node/subnode`.
 *
 * @param {string[]} files an array of sorted file paths relative to `parent`
 * @param {string} baseDir the directory of the files
 * @param {function(parent:string, file:string, explicit: boolean):string} renderLabelFn function that renders the label
 *  of a node. It receives the parent and a filenpath as parameters.
 * @param {object=} options optional parameters
 * @param {string=} options.label the label of the root node (default: '')
 * @returns {object} a tree structure as needed by [archy](https://www.npmjs.com/package/archy)
 * @access private
 */
function treeFromPaths (files, baseDir, renderLabelFn, options = {}) {
  return {
    label: options.label || '',
    nodes: childNodesFromPaths(files, baseDir, renderLabelFn)
  }
}

/**
 * Compute the child nodes of a node, given a list of paths
 * @param files
 * @param parent
 * @param renderLabelFn
 * @returns {Array}
 */
function childNodesFromPaths (files, parent, renderLabelFn) {
  // Group by first path element
  var groups = _.groupBy(files, file => file.match(/^[^/]*\/?/))
  return Object.keys(groups).map(function (groupKey) {
    const group = groups[groupKey]
    // Is this group explicitly part of the result, or
    // just implicit through its children
    const explicit = group.indexOf(groupKey) >= 0
    return {
      label: renderLabelFn(parent, groupKey, explicit),
      nodes: childNodesFromPaths(
        // Remove parent directory from file paths
        group
          .map(node => node.substr(groupKey.length))
          // Skip the empty path
          .filter(node => node),
        // New parent..., normalize to one trailing slash
        parent + groupKey,
        renderLabelFn
      )
    }
  })
}

/**
 * Merge an archy-node with its single child, but not with a leaf node.
 * Keep nodes with zero, two or more childs.
 * @access public
 */
function condense (node) {
  if (node.nodes.length === 1 && node.nodes[0].nodes.length > 0) {
    return condense({
      label: (node.label || '') + node.nodes[0].label,
      nodes: node.nodes[0].nodes
    })
  } else {
    return {
      label: node.label,
      nodes: node.nodes.map(condense)
    }
  }
}

module.exports = {
  treeFromPaths,
  condense,
  render
}
