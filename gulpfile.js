const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin');

const _dist = "./build"

gulp.task("clean", (s) => {
    console.log(s)
})

gulp.task('js', function () {
    return gulp.src("src/assets/js/**/*.js")
        .pipe(terser())
        .pipe(gulp.dest(_dist + "/assets/js"))
});

gulp.task('sass', function () {
    return gulp.src('src/assets/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed', errLogToConsole: true
        }).on('error', sass.logError))
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