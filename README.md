# tree-from-paths 

[![NPM version](https://img.shields.io/npm/v/tree-from-paths.svg)](https://npmjs.com/package/tree-from-paths)
[![Travis Build Status](https://travis-ci.org/nknapp/tree-from-paths.svg?branch=master)](https://travis-ci.org/nknapp/tree-from-paths)
[![Coverage Status](https://img.shields.io/coveralls/nknapp/tree-from-paths.svg)](https://coveralls.io/r/nknapp/tree-from-paths)

> Convert a list of paths into a archy directory-tree


# Installation

```
npm install tree-from-paths
```

 
# Usage

The following example demonstrates how to use this module:

```js
var {render} = require('tree-from-paths')

console.log(render(
  [
    'basedir/dir1/file1.txt',
    'basedir/dir1/file2.txt',
    'basedir/dir2/file3.txt',
    'basedir/dir3/',
    'basedir/dir3/file4.txt',
    'basedir/dir3/file5.txt',
    'basedir/dir4/dir5/file7.txt'
  ],
  'basedir',
  (parent, file, explicit) => {
    return `<a href='${parent}${file}'>${file}${explicit ? '(*)' : ''}</a>`
  }
))

const files = [
  {
    path: 'basedir/dir1/file1.txt',
    created: true
  },
  {
    path: 'basedir/dir1/file2.txt'
  },
  {
    path: 'basedir/dir2/file3.txt'
  },
  {
    path: 'basedir/dir3/'
  },
  {
    path: 'basedir/dir3/file4.txt',
    created: true
  },
  {
    path: 'basedir/dir3/file5.txt'
  },
  {
    path: 'basedir/dir4/dir5/file7.txt'
  }
]

console.log(
  render(files.map(x => x.path), 'basedir', (parent, file, explicit, index) => {
    const createdStr = (index >= 0 && files[index].created) ? ' created' : ''
    return `<a href='${parent}${file}'>${file}${createdStr}</a>`
  })
)
```

This will generate the following output

```
<a href='basedir/'>/</a>
├─┬ <a href='basedir/dir1/'>dir1/</a>
│ ├── <a href='basedir/dir1/file1.txt'>file1.txt(*)</a>
│ └── <a href='basedir/dir1/file2.txt'>file2.txt(*)</a>
├─┬ <a href='basedir/dir2/'>dir2/</a>
│ └── <a href='basedir/dir2/file3.txt'>file3.txt(*)</a>
├─┬ <a href='basedir/dir3/'>dir3/(*)</a>
│ ├── <a href='basedir/dir3/file4.txt'>file4.txt(*)</a>
│ └── <a href='basedir/dir3/file5.txt'>file5.txt(*)</a>
└─┬ <a href='basedir/dir4/'>dir4/</a><a href='basedir/dir4/dir5/'>dir5/</a>
  └── <a href='basedir/dir4/dir5/file7.txt'>file7.txt(*)</a>

<a href='basedir/'>/</a>
├─┬ <a href='basedir/dir1/'>dir1/</a>
│ ├── <a href='basedir/dir1/file1.txt'>file1.txt created</a>
│ └── <a href='basedir/dir1/file2.txt'>file2.txt</a>
├─┬ <a href='basedir/dir2/'>dir2/</a>
│ └── <a href='basedir/dir2/file3.txt'>file3.txt</a>
├─┬ <a href='basedir/dir3/'>dir3/</a>
│ ├── <a href='basedir/dir3/file4.txt'>file4.txt created</a>
│ └── <a href='basedir/dir3/file5.txt'>file5.txt</a>
└─┬ <a href='basedir/dir4/'>dir4/</a><a href='basedir/dir4/dir5/'>dir5/</a>
  └── <a href='basedir/dir4/dir5/file7.txt'>file7.txt</a>
```



# License

`tree-from-paths` is published under the MIT-license.

See [LICENSE.md](LICENSE.md) for details.


# Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
# Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).