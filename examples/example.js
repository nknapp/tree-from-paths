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
