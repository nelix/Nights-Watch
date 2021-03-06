module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'src/*.js']
    },
    copy:{
      runner:{
        src:"src/runner.js",
        dest:"build/runner.js"
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'build/nights-watch.min.js' : [
            'src/taskManager.js',
            'src/postman.js',
            "src/basicDataCollector.js",
            'src/cookiesManager.js',
            'src/nightsWatcher.js'
          ]
        }
      }
    },
    watch: {
      src: {
        files: ['src/*.js'],
        tasks: ['clean', 'concat', 'uglify']
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '*',
          base: 'demo/',
          debug: true
        }
      }
    },
    clean: ['build', 'demo/development.js'],
    concat: {
      options: {
        separator: "\n"
      },
      build: {
          src: [
            'src/taskManager.js',
            'src/postman.js',
            "src/basicDataCollector.js",
            'src/cookiesManager.js',
            'src/nightsWatcher.js'
          ],
          dest: 'build/nights-watch.js'
      },
      dev: {
          src: [
            'src/taskManager.js',
            'src/postman.js',
            "src/basicDataCollector.js",
            'src/cookiesManager.js',
            'src/nightsWatcher.js',
            'src/runner.js'
          ],
          dest: 'demo/development.js'
      }
    }
  });

  grunt.registerTask('default', ['clean', 'concat:dev', 'connect', 'watch']);
  grunt.registerTask('build', ['clean', 'uglify', 'concat:build', 'copy']);
};