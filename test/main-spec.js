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

describe('tree-from-paths:', function () {
  it("should be executed", function () {
    expect(treeFromPaths()).to.equal('treeFromPaths')
  })
})
