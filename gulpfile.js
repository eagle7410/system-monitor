
let gulp = require('gulp'), // Сообственно Gulp JS
	concat = require('gulp-concat'), // Склейка файлов
	jsmin = require('gulp-minify'), // Js mini
	cssmin = require('gulp-cssmin'); // Мініфикатор

gulp.task('css', () => gulp.src([
		'./static/bower/bootstrap/dist/css/bootstrap.css',
		'./static/bower/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
		'./static/app/app.styles.css'
	])
	.pipe(concat('app.min.css'))
	.pipe(cssmin())
	.pipe(gulp.dest('./static/app/assets'))
);

gulp.task('default', ['css']);
