var {render} = require('..')

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
