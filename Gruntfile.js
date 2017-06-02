'user strict';
var nodemailer = require('nodemailer');
var smtptransport = require('nodemailer-smtp-transport');
// var gmailTransport = nodemailer.createTransport('smtps://shridhars6987@gmail.com:password@smtp.gmail.com');
var gmailTransport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'shridhars6987@gmail.com',
        pass: 'pass@pass'
    }
}));

module.exports = function(grunt){

// Object to pass in initConfig method
    var gruntConfig = {
        plato: {
            stressCodeReport: {
                files: {
                    'plato/report/': ['development/app/*.js', 'development/app/**/*.js']
                }
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        env: grunt.option('target') || 'DEV',
        yuidoc : {
            compile: {
            name: '<%= pkg.name%>',
            description: '<%= pkg.description %>',
            version: '<%= pkg.version %>',
            url: '<%= pkg.homepage %>',
                options: {
                    paths: ['development'],
                    outdir: 'Documents/code_documentation/'
                }
            }
        },
        copy: {
            envConfig: {
                expand: true,
                cwd: 'environments/',
                src: 'env_<%= env %>.js',
                dest: 'development/app/',
            }
        },
        rename: {
            envConfig: {
                files: [
                    {
                        src: 'development/app/env_<%= env %>.js',
                        dest: 'development/app/envConfig.js'
                    }
                ]
            }
        },
        nodemailer: {
            options: {
                transport: gmailTransport,
                message: {
                    subject: 'A test Email',
                    text: 'This is plain text message',
                    html: '<body><h1>This is custom message</h1></body>',
                },
                recipients:[{
                    email: 'ssagari@faichi.com',
                    name: 'Test',
                }]
            },
            inline: {
                options: {
                    transport: gmailTransport,
                    message: {
                        subject: 'A test Email',
                        text: 'This is plain text message',
                        html: '<body><h1>This is custom message</h1></body>',
                    },
                    recipients:[{
                        email: 'ssagari@faichi.com',
                        name: 'Test',
                    }]
                },
            },
            external: {
                src: ['email.html']
            },
        },
        beautify:{
            files:['package.json', 'Gruntfile.js','development/**/*.js', 'development/**/**/*.js']
        },
        uglify: {
            options: {
                mangle: false,
                beautify: true,
                sourceMap: {includeSources: true},
                sourceMapName: 'sourcemap.map',
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'temp.js':['development/**/*.js', 'development/**/**/*.js']
                }
            }
        }
    };

    grunt.initConfig(gruntConfig);

    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-nodemailer');
    grunt.loadNpmTasks('grunt-beautify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Register Task syntax
/*
    grunt.registerTask('', function(){

    });
*/

    grunt.registerTask('setEnv', function(target){
        if(target)grunt.config.set('env',target);
        grunt.task.run(['copy','rename']);
        grunt.log.writeln('File Successfully copied and renamed in ' + target + ' environment');
    });

    grunt.registerTask('build', function(target){
        grunt.task.run(['setEnv:'+target]);
        grunt.task.run([
            'plato',
            'yuidoc'
        ])
    });

// nodemailer task after grunt
    // provides email functionality where you can send plato report for all people

// uglify, beautify and concat
// usemin prepare 
    // Register Task
    grunt.registerTask('filecopy', function() {
        grunt.task.run('copy:envConfig');
        grunt.task.run('rename:envConfig');
        grunt.log.writeln('File copied and renamed');
    });

/*
    // Asynchronous task
    grunt.registerTask('asyncTask', function(){ // 1
        // Force task into async mode
        var done = this.async(); // 2
        // Keep the user updated
        grunt.log.writeln('Beginning async task...'); // 3
        // Timeout
        setTimeout(function(){ // 4
          grunt.log.writeln('All done!'); // 5
          done(); // 6
        }, 1500);

    });
*/
}
