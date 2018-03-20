const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify')
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const rev = require('gulp-rev');
const autoprefixer = require('autoprefixer');
const exec = require('child_process').exec;
const del = require('del');
const runSequence = require('run-sequence');


gulp.task('dev', ['appserver']);
gulp.task('build', (callback) => {
    runSequence(
        'clean', ['sass', 'imagemin'],
        'js',
        callback
    );
});

gulp.task('appserver', ['watch'], (cb) => {
    return exec('dev_appserver.py --enable_host_checking=false --enable_console --host=0.0.0.0 --port=8080 --admin_host=0.0.0.0 --datastore_path=tmp/datastore.db dev.yaml', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('watch', ['build'], () => {
    gulp.watch('./assets-src/sass/**/*.sass', ['sass']);
    gulp.watch('./assets-src/images/*', ['imagemin']);
    gulp.watch('./assets-src/js/*.js', ['js']);
});

gulp.task('clean', () => {
    return del.sync([
        'assets/css',
        'assets/images',
        'assets/js',
        'rev-manifest.json'
    ]);
});

gulp.task('js', () => {
    return gulp.src('./assets-src/js/*.js')
        .pipe(babel({
            'presets': ['env']
        }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./assets/js'))
        .pipe(rev.manifest('rev-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('sass', () => {
    return gulp.src('./assets-src/sass/*.sass')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(postcss([autoprefixer()]))
        .pipe(rev())
        .pipe(gulp.dest('./assets/css'))
        .pipe(rev.manifest('rev-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('imagemin', () => {
    return gulp.src('./assets-src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/images'));
});
