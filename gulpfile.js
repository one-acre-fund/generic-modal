var pkg = require('./package.json');

var banner = '/**\n' +
	' * <%= pkg.description %>\n' +
	' * @version v<%= pkg.version %>\n' +
	' * @link <%= pkg.homepage %>\n' +
	' * @author <%= pkg.author %>\n' +
	' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
	' */\n\n';

var gulp   = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	header = require('gulp-header'),
	sass   = require('gulp-sass'),
	cssmin = require('gulp-cssmin');

gulp.task('scripts', function() {
	gulp.src([
			'src/genericModal/genericModal.prefix',
			'src/genericModal/*.js',
			'src/genericModal/genericModal.suffix'
		])
		.pipe(concat('generic-modal.js'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('./dist/'))
		.pipe(uglify())
		.pipe(rename('generic-modal.min.js'))
		.pipe(header(banner, { pkg : pkg } ))
	.pipe(gulp.dest('./dist'))
});

gulp.task('styles', function () {
    gulp.src('src/genericModal/genericModal.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/'))
        .pipe(cssmin())
        .pipe(rename('generic-modal.min.css'))
    .pipe(gulp.dest("./dist"));;
});

gulp.task('default', ['scripts', 'styles']);

gulp.task('watch', function() {
	gulp.watch('src/genericModal/*.js', ['scripts']);
	gulp.watch('src/genericModal/*.scss', ['styles']);
});