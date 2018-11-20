var gulp = require('gulp')
var plugins = require('gulp-load-plugins')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var gutil = require('gulp-util')
var minifyCss = require('gulp-minify-css')
var minifyHtml = require('gulp-minify-html')
var jshint = require('gulp-jshint')
var concat = require('gulp-concat')
var livereload = require('gulp-livereload')
var exec = require('child_process').exec
var del = require('del')
var vinylPaths = require('vinyl-paths')
var browserSync = require('browser-sync')
var reload = browserSync.reload

// gulp.src('./html/position.html').
//     pipe(gulp.dest('dist/html'))


// 同步
// gulp.task('one', function () {
//     console.log('one step 1')
// })
// gulp.task('two', function () {
//     console.log('two step 2')
// })
// gulp.task('three', function () {
//     console.log('three step 3')
// })

// 异步
// gulp.task('one', function (cb) {
//     setTimeout(function () {
//         console.log('one done')
//         cb()
//     }, 1000)
// })
//
// gulp.task('two', ['one'], function (cb) {
//     setTimeout(function () {
//         cb()
//     }, 1000)
// })

// gulp.task('three', ['two'], function () {
//
// })

gulp.watch('html/**/*.html', function (event) {
    console.log(event)
})

// 重命名 压缩js
gulp.task('name', function () {
    gulp.src('html/position.html')
        .pipe(rename('position-copy'))
        .pipe(gulp.dest('dist/html'))

    gulp.src('js/*.js')
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('【error】', err.toString()))
        })
        // .pipe(rename('*.copy.js'))
        .pipe(gulp.dest('dist/js'))
})

// 压缩css
gulp.task('mini-css', function () {
    gulp.src('style/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/style'))
})

// 压缩html
gulp.task('mini-html', function () {
    gulp.src('html/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/html'))
})

// 检查js
gulp.task('test-js', function () {
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter()) // 输出检查结果
})

// 文件合并
gulp.task('concat-js', function () {
    gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/concat/js'))
})

gulp.task('watch', function () {
    livereload.listen()
    gulp.watch('html/*.*', function (file) {
        livereload.changed(file.path)
    })
})

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(vinylPaths(del))
})

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: 'dev'
        }
    })
    gulp.watch(['*.html'], {cwd: 'dev'}, reload)
})

gulp.task('default',
    // ['clean'],
    // ['clean', 'name', 'mini-css', 'mini-html', 'concat-js', 'watch'],
    function () {
    console.log('gulp over ....')
})