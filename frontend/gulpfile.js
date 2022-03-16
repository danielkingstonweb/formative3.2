
const { src, dest, watch } = require("gulp");

    // Sass install
const sass = require('gulp-sass')(require('sass'));

function generateCSS(cb){
    console.log('sass function running');
    src("./sass/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./css'));
    cb();
}

exports.css = generateCSS

function watchFiles(cb){
    // The watch function takes two arguments: firstly: which files to watch, secondly the callback (or function) to be triggered after the change
    watch('sass/**/*.scss', generateCSS)
    }
    // step 9
    exports.watch = watchFiles