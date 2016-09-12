module.exports = function (grunt) {
    // Load Grunt Tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-shell-spawn');
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // compiling typescript
        ts: {
            default: {
                src: ['!node_modules/**', 'src/**/*.ts'],
                outDir: 'debug',
                tsconfig: true
            }
        },

        // copy configuration
        copy: {
            config: {
                files: [
                    {
                        cwd: 'src',
                        src: './config/*.*',
                        dest: './debug/',
                        expand: true
                    }
                ]
            },
            views: {
                files: [
                    {
                        cwd: 'src',
                        src: ['./views/**/*.*'],
                        dest: './debug/',
                        expand: true
                    }
                ]
            }
        },

        // start node js server
        shell: {
            debugNode: {
                command: 'node ./debug/app.js',
                options: {
                    async: true
                }
            }
        },

        //watch
        watch: {
            ts: {
                files: ['src/**/*.ts', '!node_modules/**'],
                tasks: ['shell:debugNode:kill','ts','shell:debugNode'],
                options: {
                    spawn: false
                }
            },
            views: {
                files: ['src/views/*'],
                tasks: ['copy:views'],
                options: {
                    spawn: false
                }
            },
            config: {
                files: ['src/config/*.*'],
                tasks: ['shell:debugNode:kill','copy:config','shell:debugNode'],
                options: {
                    spawn: false
                }
            }
        },

        //clean
        clean: {
            options: {force: true},
            debug: ['./debug/']
        }
    });

    grunt.registerTask('debug', [
        'clean:debug',
        'ts',
        'copy:config',
        'copy:views',
        'shell:debugNode',
        'watch'
    ]);
};