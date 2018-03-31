gulp = require 'gulp'
coffee = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
plumber = require 'gulp-plumber'
changed = require 'gulp-changed'
watch = (require 'gulp-chokidar')(gulp)

errorHandler = (error) ->
  console.log error
  @emit 'end'

coffeeFiles = [
  './**/*.coffee'
  '!./gulpfile.coffee'
  '!./node_modules/**/*'
  '!./bower_components/**/*'
  '!./karma.conf.coffee'
]

bundle = [
  'node_modules/angular/angular.js'
  './CoffeeScript/**/*.js'
]

output = './Bundle/'

gulp.task 'coffee', ->
  gulp.src coffeeFiles
    .pipe changed '.', {extension: '.js'}
    .pipe plumber
      handleError: errorHandler
    .pipe coffee()
    .pipe gulp.dest '.'

gulp.task 'coffee-lint', ->
  gulp.src coffeeFiles
    .pipe changed '.', {extension: '.js'}
    .pipe plumber
      handleError: errorHandler
    .pipe coffeelint()
    .pipe coffeelint.reporter()

gulp.task 'bundle', ->
  gulp.src bundle
    .pipe concat output + 'bundle.js'
    .pipe gulp.dest '.'

gulp.task 'minify', ->
  gulp.src [output + 'bundle.js']
    .pipe uglify {mangle: false}
    .pipe concat output + 'bundle.min.js'
    .pipe gulp.dest '.'

gulp.task 'watch', ->
  watch './**/*.coffee', ['coffee-lint', 'coffee']
  watch './**/*.js', ['bundle']
  watch output + 'bundle.js', ['minify']