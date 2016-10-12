// require modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var jquery = require('gulp-jquery');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

// source and distribution folder
var source = 'src/',
    dest = 'dist/';

// Bootstrap scss source
var bootstrapSass = {
  in: './node_modules/bootstrap-sass/'
};

// Bootstrap fonts source
var fonts = {
  in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    out: dest + 'fonts/'
};

// Scss source folder: .scss files
var scss = {
    in: source + 'scss/main.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

// copy bootstrap required fonts to dest
gulp.task('fonts', function(){
  return gulp
      .src(fonts.in)
      .pipe(gulp.dest(fonts.out));
});

// compile scss
gulp.task('sass', ['fonts'], function(){
  return gulp.src(scss.in)
    .pipe(sass(scss.sassOpts))
    .pipe(gulp.dest(scss.out));
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('src/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('src/javascript/**/*.js', ['jshint']);
});

// js concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./src/javascript/*.js', '.src/js/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['watch', 'scripts', 'jshint', 'sass'], function() {
  gulp.watch('./src/javascripts/*.js', function() {
    gulp.run('jshint', 'scripts');
  });
  gulp.watch('./src/scss/*.scss', function() {
    gulp.run('sass');
  });
});
