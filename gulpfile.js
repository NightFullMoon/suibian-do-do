var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss=require('gulp-minify-css');
var connect = require('gulp-connect');

gulp.task('default', function(arg) {

});

var PROJECT = "./src/";
const OUTPUT="./dist/"

//使用connect启动一个Web服务器
gulp.task('connect', function() {
        connect.server({
                // host : '', //地址，可不写，不写的话，默认localhost
                port: 3000, //端口号，可不写，默认8000
                root: PROJECT, //当前项目主目录
                livereload: true //自动刷新
        });
});

// 自动刷新
gulp.task('reload', function() {
        gulp.src(PROJECT + '*.html')
                .pipe(connect.reload());
});

var lessFile = PROJECT + 'style/*.less';
gulp.task('less',function(){
       var stream = gulp.src(lessFile)
                .pipe(less())
                .pipe(minifyCss())
                .pipe(gulp.dest(OUTPUT + 'css/'));
        return stream;
});

gulp.task("copy",function () {
        gulp.src(PROJECT+"*.html")
                 .pipe(gulp.dest(OUTPUT ));
        gulp.src(PROJECT + "js/*.js")
                         .pipe(gulp.dest(OUTPUT+"js/"));
});

// 监听文件的刷新
gulp.task('watch', ['less'],function() {
        gulp.watch([lessFile], ['less']);
        gulp.watch(OUTPUT + 'css/*.css', ['reload']); //监控css文件
        gulp.watch(OUTPUT + 'js/*.js', ['reload', 'copy']); //监控js文件
        gulp.watch([PROJECT + '*.html'], ['reload', 'copy']); //监控html文件
});
//执行gulp server开启服务器
gulp.task('live', ['less','connect', 'watch']);
