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
  return src('src/images/*.{png,jpg,gif,jpeg}')
  .pipe(imagemin([
    imagemin.mozjpeg({quality:80, progressive:true}),
    imagemin.optipng({optimizationLevel:2}),
  ]))
  .pipe(imagewebp())
  .pipe(dest('dist/images'))
}

//asset images
function assetsbuild(){
  return src('src/assets/*.{png,jpg,jpeg}')
  .pipe(imagemin([
    imagemin.mozjpeg({quality:80, progressive:true}),
    imagemin.optipng({optimizationLevel:2}),
  ]))
  .pipe(imagewebp())
  .pipe(dest('dist/assets/'))
}

//asset images
function svgbuild(){
  return src('src/assets/*.svg')
  .pipe(dest('dist/assets/'))
}

//asset images
function mtagbuild(){
  return src('src/mtag/*.png')
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel:2}),
  ]))
  .pipe(dest('dist/mtag/'))
}


//create watch task

function watchtask(){
  watch('dist/*.html', browsersyncReload);
  watch(['src/**/*.scss', 'src/**/*.js'], series(compilescss, compilepug, jsbuild, browsersyncReload));
  watch('src/scss/*.scss', compilescss);
  watch('src/pug/**/*.pug', compilepug);
  watch('src/js/*.js', jsbuild);
  watch('src/assets/*.{jpg,png,jpeg,webp}', assetsbuild);
  watch('src/assets/*.svg', svgbuild);
  watch('src/images/*.{jpg,png,jpeg,webp}', imgbuild);
}


// default
exports.default = series(
  compilescss,
  compilepug,
  jsbuild,
  assetsbuild,
  mtagbuild,
  imgbuild,
  svgbuild,
  browsersyncServe,
  browsersyncReload,
  watchtask
);