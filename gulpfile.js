// const { series, src, dest  } = require('gulp');
const gulp = require('gulp');
// var gulpif = require('gulp-if')
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
sass.compiler = require('node-sass')
const htmlmin = require('gulp-htmlmin');

const _dist = "./dist/Sandeep-Mani.github.io"

gulp.task("clean", (s) => {
    console.log(s)
})

gulp.task('js', function () {
    return gulp.src("src/assets/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest(_dist + "/assets/js"))
});

gulp.task('sass', function () {
    return gulp.src('src/assets/sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(_dist + '/assets/css'));
});

gulp.task('minify_index', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(_dist));
});

gulp.task("copy", () => {
    gulp.src('src/assets/sass/images/**.*')
        .pipe(gulp.dest(_dist + '/assets/css/images'));
    gulp.src("src/images/**.*")
        .pipe(gulp.dest(_dist + "/images"));
    gulp.src("src/assets/webfonts/**.*")
        .pipe(gulp.dest(_dist + "/assets/webfonts"));
    gulp.src("src/assets/particlesjs-config.json")
        .pipe(gulp.dest(_dist + "/assets"));
    return gulp.src("src/assets/sass/fontawesome-all.min.css")
        .pipe(gulp.dest(_dist + "/assets/css/"));
});

gulp.task('default', gulp.parallel(
    "js",
    "sass",
    "copy",
    "minify_index"));