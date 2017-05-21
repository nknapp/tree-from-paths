/*!
 * tree-from-paths <https://github.com/nknapp/tree-from-paths>
 *
 * Copyright (c) 2017 Nils Knappmeier.
 * Released under the MIT license.
 */

/* eslint-env mocha */

const treeFromPaths = require('../')
const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

var files = [
  'basedir/dir1/file1.txt',
  'basedir/dir1/file2.txt',
  'basedir/dir2/file3.txt',
  'basedir/dir3/',
  'basedir/dir3/file4.txt',
  'basedir/dir3/file5.txt',
  'basedir/dir4/dir5/file7.txt'
]

describe('the render function', function () {
  it('should render a list of files as tree', function () {
    expect(treeFromPaths.render(files, 'basedir/', (parent, file, explicit) => file)).to.equal(`
├─┬ dir1/
│ ├── file1.txt
│ └── file2.txt
├─┬ dir2/
│ └── file3.txt
├─┬ dir3/
│ ├── file4.txt
│ └── file5.txt
└─┬ dir4/dir5/
  └── file7.txt
`)
  })

  it('should pass a normalized parrent with trailing slashes into the render-functionc', function () {
    expect(treeFromPaths.render(files, 'basedir/', (parent, file, explicit) => `${parent}${file} `)).to.equal(`
├─┬ basedir/dir1/ 
│ ├── basedir/dir1/file1.txt 
│ └── basedir/dir1/file2.txt 
├─┬ basedir/dir2/ 
│ └── basedir/dir2/file3.txt 
├─┬ basedir/dir3/ 
│ ├── basedir/dir3/file4.txt 
│ └── basedir/dir3/file5.txt 
└─┬ basedir/dir4/ basedir/dir4/dir5/ 
  └── basedir/dir4/dir5/file7.txt 
`)
  })

  it('should pass explicit=true to the render-function, if the current node is an item of the input list', function () {
    expect(treeFromPaths.render(files, 'basedir/', (parent, file, explicit) => file + (explicit ? '*' : ''))).to.equal(`
├─┬ dir1/
│ ├── file1.txt*
│ └── file2.txt*
├─┬ dir2/
│ └── file3.txt*
├─┬ dir3/*
│ ├── file4.txt*
│ └── file5.txt*
└─┬ dir4/dir5/
  └── file7.txt*
`)
  })

  it('should add an optional label to the root-node', function () {
    expect(treeFromPaths.render(
      [
        'basedir/dir1/file2.txt',
        'basedir/dir2/file3.txt'
      ],
      'basedir/',
      (parent, file, explicit) => file,
      {label: 'this is a label'}
    )).to.equal(`this is a label
├─┬ dir1/
│ └── file2.txt
└─┬ dir2/
  └── file3.txt
`)
  })
})
