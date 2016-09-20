//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),     //本地安装gulp所用到的地方
    gulpScss = require('gulp-sass'), //编译sass文件
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),  //
    reload = browserSync.reload,
    gulpMinifycss = require('gulp-minify-css'); //压缩css文件,未用

// 打包后路径
// var srcPath = {
//     scss: 'src/mobile/v1/css/'
// }

//建立一个叫scss-monitor的任务
gulp.task('scssMonitor', function() {
    return gulp.src('./sass/*.scss')
    .pipe(gulpScss().on('error', gulpScss.logError))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
});
// 监听scss样式文件
// gulp.task('scssWatch', function() {
//     gulp.watch('./sass/*.scss',['scssMonitor']);
// });

gulp.task('serve', ['scssMonitor'], function() {
    // var files = [
    // 'html/*.html',
    // 'sass/*.scss',
    // 'sass/**/*.scss',
    // 'js/*.js'
    // ];
    // browserSync.init(files,{
    browserSync.init({
        port: 4321,
        server:{
            baseDir: './'
        }
    });
    gulp.watch('./sass/*.scss',['scssMonitor']);
    gulp.watch('./sass/**/*.scss',['scssMonitor']);
    gulp.watch('html/*.html').on('change', reload);
});

gulp.task('default',['serve']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径