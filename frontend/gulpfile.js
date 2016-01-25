//Путь к собранным файлам. Такой путь сделан специально для статики django
var path = "../static/dist";
//Иницилизируем плагины:
var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    minifyHTML = require('gulp-minify-html'),
    rename = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache');
//Создаем переменные с путями к нашим файлам
var paths = {
    scripts: ['src/module.js', 'src/**/*.js'], //Скрипты
    styles: 'src/**/*.less',//Стили
    images: 'src/img/**/*.*',//Картинки
    templates: ['src/**/*.html', '!src/index.html'],//Html
    index: 'src/index.html' //Главный файл
};
//Собираем скрипты и стили, которые указаны в index.html
gulp.task('usemin', function () {
    return gulp.src(paths.index)
        .pipe(usemin({
            //js: [minifyJs(), 'concat'],
            //css: [minifyCss({keepSpecialComments: 0}), 'concat']
            js: ['concat'],
            css: ['concat']
        }))
        .pipe(gulp.dest(path));
});
// Перечисляем задачи для выполнения gulp'ом
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-styles', 'custom-templates-cache']);
//Изображения - просто переносим их.
gulp.task('custom-images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(path + '/img'));
});
//Скрипты -
// добавляем обертку, в которой указываем директиву 'use strict' для работы кода по современному стандарту ES5,
// минимизируем, объединяем в один файл main.min.js, и переносим.
gulp.task('custom-js', function () {
    return gulp.src(paths.scripts)
        .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
        //.pipe(minifyJs())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(path + '/js'));
});
//Стили - сперва переводим less в css, затем минимизируем, потом объединяем в один файл main.min.js и наконец переносим
gulp.task('custom-styles', function () {
    return gulp.src(paths.styles)
        .pipe(less())
        //.pipe(minifyCss())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest(path + '/styles'));
});
//Html - кешируем html
gulp.task('custom-templates-cache', function () {
    return gulp.src(paths.templates)
        //.pipe(minifyHTML())
        .pipe(rename(function (path) {
            path.dirname = "/";
        }))
        .pipe(templateCache('templates.js',{module:'templatescache', standalone:true}))
        .pipe(gulp.dest(path + '/js'));
});
//Указываем gulp, какие файлы могут быть изменены
gulp.task('watch', function () {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-styles']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates-cache']);
    gulp.watch([paths.index], ['usemin']);
});
// Создаем вебсервер с автоперезагрузкой при изменении нашего приложения, который будет доступен по адресу 127.0.0.1:8888
gulp.task('webserver', function () {
    connect.server({
        root: path,
        livereload: true,
        port: 8888
    });
});
gulp.task('livereload', function () {
    gulp.src([path + '/**/*.*'])
        .pipe(watch())
        .pipe(connect.reload());
});
// Перечисляем все задачи в порядке их следования
gulp.task('build', ['usemin', 'build-custom']);
gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);
