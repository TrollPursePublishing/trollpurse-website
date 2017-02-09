var gulp = require('gulp');
var clean = require('del');
var minifyJS = require('gulp-minify');
var minifyHTML = require('gulp-htmlmin');
var minifyIMG = require('gulp-imagemin');

gulp.task('cleanDest', function() {
	return clean(['built/**/*']);
});

gulp.task('minifyHTML', function() {
	return gulp.src('html/*.html')
		.pipe(minifyHTML({collapseWhitespace: true}))
		.pipe(gulp.dest('built/html/'));
});

gulp.task('minifyJS', function() {
	return gulp.src('js/*.js')
		.pipe(minifyJS({
			ext: {
				src:'.js',
				min: '.js'
			}
		}))
		.pipe(gulp.dest('built/js/'));
});

gulp.task('minifyIMG', function() {
	return gulp.src('images/*')
		.pipe(minifyIMG())
		.pipe(gulp.dest('built/images/'));
		
});

gulp.task('build', ['cleanDest', 'minifyHTML', 'minifyJS', 'minifyIMG']);
