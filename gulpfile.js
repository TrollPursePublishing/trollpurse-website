var gulp = require('gulp');
var clean = require('del');
var minifyJS = require('gulp-minify');
var minifyHTML = require('gulp-htmlmin');
var minifyIMG = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var zip = require('gulp-zip');
var runSequence = require('run-sequence');

gulp.task('cleanDest', function() {
	return clean(['built/**/*']);
});

gulp.task('minifyHTML', function() {
	return gulp.src(['html/*.html'])
		.pipe(minifyHTML({collapseWhitespace: true}))
		.pipe(gulp.dest('built/'));
});

gulp.task('minifyCSS', function(){
	return gulp.src(['css/*.css'])
		// .pipe(cleanCSS({compatibility: 'ie8'})) TODO: it doesn't work in Chrome in prod
		.pipe(gulp.dest('built/css'));
});

gulp.task('copyRobots', function() {
	return gulp.src(['html/robots.txt'])
		.pipe(gulp.dest('built/'));
});

gulp.task('zipLogos', function() {
    gulp.src('built/images/logos/**/*.png')
        .pipe(zip('TROLLPURSE_LOGOS.zip'))
        .pipe(gulp.dest('built/images/logos/'))
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
	return gulp.src(['images/**/*.*', 'html/*.ico'])
		.pipe(minifyIMG())
		.pipe(gulp.dest('built/images/'));
		
});

gulp.task('build', function(done){
	runSequence('cleanDest', ['minifyHTML', 'minifyJS', 'minifyCSS', 'minifyIMG', 'copyRobots'], 'zipLogos', function() {
		done();
	});
});
