var path = require('path');


var appContext = {
    paths: {
        scripts: {

        },
        styles: {
            root: './assets/styles/'
        }
    }
};

module.exports = function(grunt) {

    var tasks = {
        styles:  ['less', 'autoprefixer'],
        watch:   ['watch'],
        all:     ['less', 'autoprefixer']
    };
    tasks.all = [].concat(tasks.styles, tasks.scripts);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            options: {
                compress: true,
                sourceMap: true,
                sourceMapFilename: appContext.paths.styles.root + 'site.css.map'
            },
            files: {
                src: [ appContext.paths.styles.root + 'site.less' ],
                dest: appContext.paths.styles.root + 'site.css'
            }
        },

        autoprefixer: {

            options: {
                browsers: ['last 8 versions', 'ie 8', 'ie 9']
            },

            single_file: {
                options: {},
                src: appContext.paths.styles.root + 'site.css',
                dest: appContext.paths.styles.root + 'site.css'
            },
            sourcemap: {
                options: {
                    map: true
                }
            }
        },
        watch: {
            css: {
                files: '**/*.less',
                tasks: tasks.styles
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('styles',  tasks.styles);
    grunt.registerTask('watcher', tasks.watch);
    grunt.registerTask('default', tasks.all);
};