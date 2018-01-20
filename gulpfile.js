'use strict';
const gulp = require('gulp');
const cache = require('gulp-cached');
const styleInject = require('gulp-style-inject');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const changed  = require('gulp-changed');
const runSequence = require('run-sequence');

// --------------------------------------------
// setting
// --------------------------------------------
//wpが起動しているポート番号
// const WP = 9104;
const SCSS_FILE = './src/scss/**/*.scss';
const CSS_FILE = './css/**/*.css';
const CSS_DEST = './css/';
const WATCH_FILE = [
	'./src/*.html'
];
const IMG_FILE = './src/img/**/*'
const IMG_DEST = './img/'

// --------------------------------------------
// img min
// --------------------------------------------
gulp.task('img-min', function () {
	return gulp.src(IMG_FILE)
		.pipe(changed(IMG_DEST))
		.pipe(plumber())
		.pipe(imagemin([
			imagemin.gifsicle({
				interlaced: true,
				// 圧縮レベル1~3
				optimizationLevel: 1
			}),
			imagemin.jpegtran({
				progressive: true,
			}),
			imagemin.optipng({
				// 圧縮レベル1~7
				optimizationLevel: 5
			}),
			imagemin.svgo({
				plugins: [{
						removeViewBox: true
					},
					{
						cleanupIDs: true
					}
				]
			})
		])).pipe(gulp.dest(IMG_DEST))
});

// --------------------------------------------
// Sass
// --------------------------------------------
gulp.task('sass', function () {
	gulp.src([SCSS_FILE])
		.pipe(cache('sass'))
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer())
		.pipe(gulp.dest(CSS_DEST))
		.pipe(browserSync.stream());
});

// --------------------------------------------
// browser-sync
// --------------------------------------------
gulp.task('browser-sync', function () {
	// ローカル開発環境の場合はこちら
	// browserSync.init({
	// 		proxy: 'localhost:' + WP + '/wp-admin',
	// 		open: 'external',
	// 		notify: false
	// });
	// 静的開発環境の場合はこちら
	browserSync.init({
		server: './',
		open: 'external',
		notify: false
	});
});


gulp.task('sIj', function () {
	gulp.src(WATCH_FILE)
		.pipe(styleInject({
			// trueにすると自動でstyleタグが付く
			encapsulated: false
		}))
		.pipe(gulp.dest('./'));
});


// --------------------------------------------
// Watch
// --------------------------------------------
gulp.task('watch', function () {
	gulp.watch([WATCH_FILE, CSS_FILE]).on('change', browserSync.reload);
	gulp.watch([SCSS_FILE], ['sass']);
	gulp.watch([CSS_FILE, WATCH_FILE], ['sIj']);
});

// --------------------------------------------
// command
// --------------------------------------------
gulp.task('default', function (callback) {
	return runSequence(
		'browser-sync',
		'sass',
		'sIj',
		'watch',
		callback
	);
});

// 
// --------------------------------------------
gulp.task('product', function (callback) {
	return runSequence(
		'img-min',
		'sass',
		'sIj',
		callback
	);
});