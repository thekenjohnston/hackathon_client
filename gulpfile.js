var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var typescript = require('gulp-tsc');
var inject = require('gulp-inject');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  css: ['./www/css/**/*.css'],
  ts: ['./www/app/**/*.ts'],
  js: [
    './www/app/**/*.module.js',
    './www/app/**/*.provider.js',
    './www/app/**/*.config.js',
    './www/app/**/*.route.js',
    './www/app/**/*.run.js',
    './www/app/**/*.service.js',
    './www/app/**/*.controller.js'
  ]
};

gulp.task('default', ['sass', 'compile', 'injector']);

gulp.task('sass', function (done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('compile', function () {
  gulp.src(paths.ts)
    .pipe(typescript({
      emitError: false
    }))
    .pipe(gulp.dest('www/app/'))
})

gulp.task('injector', function () {
  return gulp.src('./www/index.html')
    .pipe(inject(gulp.src(paths.js, { read: false }), { relative: true }))
    .pipe(inject(gulp.src(paths.css, { read: false }), { relative: true }))
    .pipe(gulp.dest('./www'));
})

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.ts, ['compile']);
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
