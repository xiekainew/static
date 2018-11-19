var gulp = require('gulp')

gulp.task('default', function () {
    console.log('gulp start ....')
})

gulp.src('./html/position.html').
    pipe(gulp.dest('dist/html'))