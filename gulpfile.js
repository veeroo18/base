//list dependencies 
const { src, dest, watch, series } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('node-sass'));
const clean = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
const browsersync = require('browser-sync').create();

// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: 'dist/'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

//scss
function compilescss(){
  return src('src/scss/*.scss')
  .pipe(sass())
  .pipe(prefix())
  .pipe(clean())
  .pipe(dest('dist/css'))
}

//pug
function compilepug(){
  return src('src/pug/*.pug')
  .pipe(pug())
  .pipe(dest('dist/'))
}

//js 
function jsbuild() {
  return src('src/js/*.js')
  .pipe(dest('dist/js'))
}

//images
function imgbuild(){
  return src('src/images/*.{jpg,jpeg,png}')
  .pipe(imagemin([
    imagemin.mozjpeg({quality:80, progressive:true}),
    imagemin.optipng({optimizationLevel:2}),
  ]))
  .pipe(dest('dist/images'))
}

// images - webp
function webpimg(){
  return src('dist/images/*.{jpg,png,webp}')
  .pipe(imagewebp())
  .pipe(dest('dist/images/webp'))
}


//create watch task

function watchtask(){
  watch('src/scss/*.scss', compilescss);
  watch('src/pug/**/*.pug', compilepug);
  watch('src/js/*.js', jsbuild);
  watch('src/images/*.{jpg,png,webp}', imgbuild);
  watch('dist/images/*.{jpg,png}', webpimg);
}


// default
exports.default = series(
  compilescss,
  compilepug,
  jsbuild,
  imgbuild,
  webpimg,
  browsersyncServe,
  browsersyncReload,
  watchtask
);