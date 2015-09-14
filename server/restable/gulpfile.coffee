gulp       = require 'gulp'
nodemon    = require 'gulp-nodemon'
coffeeES6  = require 'gulp-coffee-es6'

paths =
  src  : 'src/**/*.coffee'
  dest : 'lib'

gulp.task 'compile', ->
  gulp.src paths.src
    .pipe coffeeES6 bare: yes
    .pipe gulp.dest paths.dest

  gulp.src 'example/coffee/**/*.coffee'
    .pipe coffeeES6 bare: yes
    .pipe gulp.dest 'example'

gulp.task 'example-server', ->
  nodemon
    script: 'example/app.js'
    nodeArgs: ['--harmony']
    ignore: [
      './src/**'
      './test/**'
      './node_modules/**'
    ]

gulp.task 'watch', ->
  gulp.watch paths.src, ['compile']

gulp.task 'default', ['compile', 'watch']
