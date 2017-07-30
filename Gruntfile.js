'use strict';
module.exports = function (grunt) {
    var nodemailer = require('nodemailer');
    var gmailTransport = nodemailer.createTransport('smtps://mathvish%40gmail.com:password@smtp.gmail.com')
    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json'),
        env: 'DEV',
        plato: {
            StressCodeReport: {
                files: {
                    'plato/report/': ['development/app/*.js', 'development/app/**/*.js']
                }
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: ['development'],
                    outdir: 'documents/code/'
                }
            }
        },
        copy: {
            envConfig: {
                expand: true,
                cwd: 'environments/',
                src: 'env_<%= env %>.js',
                dest: 'development/app/',
            },
        },
        rename: {
            envConfig: {
                files: [
                    { src: ['development/app/env_<%= env %>.js'], dest: 'development/app/envConfig.js' },
                ]
            }
        },
        nodemailer: {
            options: {
                transport: gmailTransport,
                message: {
                    subject: 'A test e-mail',
                    text: 'Plain text message',
                    html: '<body><h1>HTML custom message</h1></body>',
                },
                recipients: [
                    {
                        email: 'mathvish@gmail.com',
                        name: 'Vish Math'
                    }
                ]
            },

            inline: { /* use above options*/ },

            external: {
                src: ['plato/report/index.html']
            }
        }

    };

    //Configure grunt - config contains the action that needs to be done on the npm grunt tasks (loadNpmTasks). Key is the task name.
    grunt.initConfig(gruntConfig);

    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-nodemailer');

    grunt.registerTask('setEnv', function (target) {
        grunt.config.set('env', target);
        grunt.task.run(['copy', 'rename']);
    });

    grunt.registerTask('build', function (target) {
        grunt.task.run(['setEnv:' + target]);
        grunt.task.run(['plato', 'yuidoc']);
    })
};