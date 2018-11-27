var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
// 代理
gulp.task('browser-sync', function() {
    browserSync.init({
		server: "./",
    });
    gulp.watch("./*.html").on('change', reload);
    gulp.watch("./**/*.css").on('change', reload);
    gulp.watch("./js/**/*.js").on('change', reload);
    gulp.watch("./js/*.js").on('change', reload);
    gulp.watch("./tpl/**/*.tpl").on('change', reload);
    gulp.watch("./img/*.png").on('change', reload);
    gulp.watch("./img/*.jpg").on('change', reload);
});
gulp.task('default', ['browser-sync']);