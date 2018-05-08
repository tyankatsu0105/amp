'use strict';

// 各種設定ファイル
const config = require('./config.json');

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const changed = require('gulp-changed');
const cache = require('gulp-cached');
const progeny = require('gulp-progeny');

// style-inject
const styleInject = require('gulp-style-inject');

// sass
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// img min
const imagemin = require('gulp-imagemin');

// stylelint
const stylelint = require('gulp-stylelint');

// prettier
const prettierPlugin = require('gulp-prettier-plugin');

// // --------------------------------------------
// // stylelint
// // --------------------------------------------
gulp.task('stylelint', () => {
	return gulp.src(config.scss, { since: gulp.lastRun('stylelint') })
	.pipe(plumber({
		// errorHandler: notify.onError('Error: <%= error.message %>')
	}))
		.pipe(stylelint({
			fix: true
		}))
		.pipe(gulp.dest(file => file.base));
});


// // --------------------------------------------
// // prettier scss
// // --------------------------------------------
gulp.task("prettier:scss", () => {
	return gulp.src(config.prettier.scss, { since: gulp.lastRun('prettier:scss') })
		.pipe(prettierPlugin({
			// 1行に記述できる文字量　超えると改行する　但し、改行するとエラーになる場合は改行しない
			printWidth: 80,
			// タブの際のインデント数
			tabWidth: 2,
			// ダブルクォーテーションをシングルクォーテーションに変更 ""->''
			singleQuote: true,
			// 配列やオブジェクトなどに使うブラケット（意：カッコ）のスペースを有効にする　有効にするとブラケットにスペースが付く
			bracketSpacing: true
		}, {
			filter: false
		}))
		.pipe(gulp.dest(file => file.base))
});

// --------------------------------------------
// Sass
// --------------------------------------------
gulp.task('sass', () => {
	return gulp.src(config.scss)
	.pipe(cache('sass'))
  .pipe(progeny())
	.pipe(plumber({
		errorHandler: notify.onError('Error: <%= error.message %>')
	}))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ["last 2 versions", "ie >= 9", "Android >= 4", "ios_saf >= 8"],
			cascade: false
		}))
		.pipe(gulp.dest(config.cssDest))
});

// --------------------------------------------
// browser-sync
// --------------------------------------------
gulp.task('browser-sync', () => {
	if (config.port) {
		if (config.connectPhp) {
			// connect-php使用
			connectPhp.server({
				port: config.port,
				base: './',
				bin: '/Applications/MAMP/bin/php/php5.6.31/bin/php',
				ini: '/Applications/MAMP/bin/php/php5.6.31/conf/php.ini'
			}, () => {
				browserSync.init({
					proxy: `localhost:${config.port}`,
					open: 'external',
					notify: false,
				});
			});
		} else {
			// docker mamp xampなど
			browserSync.init({
				proxy: `localhost:${config.port}`,
				open: 'external',
				notify: false
			});
		}
	} else {
		// 静的開発環境
		browserSync.init({
			server: './',
			open: 'external',
			notify: false
		});
	}
});

// --------------------------------------------
// img min
// --------------------------------------------
gulp.task('img-min', () => {
	return gulp.src(config.img)
		.pipe(changed(config.imgDest))
		.pipe(imagemin([
			imagemin.gifsicle({
				interlaced: true,
				// 圧縮レベル1~3
				optimizationLevel: 2
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
		])).pipe(gulp.dest(config.imgDest))
});

// --------------------------------------------
// style-inject
// --------------------------------------------
gulp.task('sIj', () => {
	return gulp.src(config.watch)
		.pipe(styleInject({
			// trueにすると自動でstyleタグが付く
			encapsulated: false
		}))
		.pipe(gulp.dest('./'));
});

// --------------------------------------------
// Watch
// --------------------------------------------
gulp.task('watch', (done) => {
	gulp.watch([config.watch, config.scss]).on('change', browserSync.reload);
	gulp.watch([config.watch, `${config.cssDest}*.css`], gulp.series('sIj'));
	gulp.watch(config.scss, gulp.series('stylelint','prettier:scss', 'sass'));
	gulp.watch(config.img, gulp.series('img-min'));
	done();
});

// --------------------------------------------
// command
// --------------------------------------------
gulp.task('default',
	gulp.parallel('browser-sync', 'watch')
);
