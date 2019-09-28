const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');

const files = { 
  scssPath: 'html/scss/**/*.scss'
  // jsPath: 'app/js/**/*.js'
}

function scssTask(){    
  return src(files.scssPath)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(postcss([ autoprefixer(), cssnano() ]))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('./html/styles/')
  );
}

function watchTask(){
  watch(
      [files.scssPath],
      parallel(scssTask)
  );
}

exports.default = series(
  parallel(scssTask), 
  watchTask);