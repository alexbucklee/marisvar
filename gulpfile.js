const gulp = require('gulp');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const sync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const newer = require('gulp-newer');
const concat = require('gulp-concat');
const del = require('del');

const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin')

// Server

function browsersync() {
    sync.init({
        server: { baseDir: 'source/' },
        notify: false,
        online: true
    })
}

// Scripts

function scripts() {
    return gulp.src([
            'source/js/swiper-bundle.min.js',
            'source/js/modernizr-webp.js',
            'source/js/script.js',
        ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('source/js'))
        .pipe(sync.stream())
}

// Styles

function styles() {
    return gulp.src('source/sass/main.scss')
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(autoprefixer({ overrideBrowserlist: ['last 10 versions'], grid: true }))
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('source/css/'))
        .pipe(sync.stream());
}

// Images

function images() {
    return gulp.src('source/img/src/**/*.{jpg,png}')
        .pipe(newer('source/img/dest/'))
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.mozjpeg({progressive: true}),
        ]))
        .pipe(gulp.dest('source/img/dest/'))
}

function createWebp() {
    return gulp.src('source/img/src/**/*.{png,jpg}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('source/img/dest/'))
}

function cleanimg() {
    return del('source/img/dest', { force: true} )
}

// Build

function buildcopy() {
    return gulp.src([
        'source/fonts/**/*.{woff,woff2}',
        'source/css/main.min.css',
        'source/js/script.min.js',
        'source/img/dest/**/*',
        'source/*.ico',
        'source/**/*.html',
    ], {
        base: 'source'
    })
    .pipe(gulp.dest('docs'));
};


function cleanbuild() {
    return del('docs/**/*', { force: true });
};

function smartwatch() {
    gulp.watch('source/js/script.js', scripts);
    gulp.watch('source/sass/*.scss', styles);
    gulp.watch('source/**/*.html').on('change', sync.reload);
    gulp.watch('source/img/src/**/*', gulp.series(images, createWebp));
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.webp = createWebp;
exports.build = gulp.series(cleanbuild, styles, scripts, images, buildcopy);
exports.default = gulp.parallel(styles, scripts, browsersync, smartwatch);