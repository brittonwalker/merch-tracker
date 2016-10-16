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

// Get leaflet tools
var leaflet = {
  css: {
    in: './node_modules/leaflet/dist/leaflet.css'
  },
  js: {
    in: './node_modules/leaflet/dist/leaflet.js'
  },
  images: {
    in: './node_modules/leaflet/dist/images/*'
  }
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

gulp.task('leafletCss', function(){
  return gulp
    .src(leaflet.css.in)
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('leafletImages', function(){
  return gulp
    .src(leaflet.images.in)
    .pipe(gulp.dest('./dist/css/images'))
})

gulp.task('leafletJs', function(){
  return gulp
    .src(leaflet.js.in)
    .pipe(gulp.dest('./dist/js/'))
})

// compile scss
gulp.task('sass', ['fonts'], function(){
  return gulp.src(scss.in)
    .pipe(sass(scss.sassOpts))
    .pipe(gulp.dest(scss.out));
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['jshint']);
});

// js concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./src/js/*.js', '.src/js/*.js'])
    .pipe(concat('script.js'))
    // .pipe(stripDebug())
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['watch', 'scripts', 'jshint', 'sass'], function() {
  gulp.watch('./src/js/*.js', function() {
    gulp.run('scripts');
  });
  gulp.watch('./src/scss/*.scss', function() {
    gulp.run('sass');
  });
});
