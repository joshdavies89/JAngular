module.exports = function(grunt) {
  // Load tasks automatically with 'load-grunt-tasks' plugin.
  require('load-grunt-tasks')(grunt);

  // Define our theme directory
  var themeDir = 'www';
  // Specify where to find dependencies we load in with Bower
  var sassLib = ['www/lib'];
  // Define the CSS files we want compiled from SCSS files
  var sassFiles = {};
  sassFiles[themeDir + '/css/style.css'] = themeDir + '/scss/style.scss';
  sassFiles[themeDir + '/css/print.css'] = themeDir + '/scss/print.scss';

  // Project configuration.
  grunt.initConfig({
    sass: {
      dev: {
        options: {
          sourceMap: true,
          outputStyle: 'expanded',
          includePaths: sassLib
        },
        files: sassFiles,
      },
      build: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed',
          includePaths: sassLib
        },
        files: sassFiles,
      }
    },
    sass_globbing: {
      your_target: {
        files: {
          'scss/_importMap.scss': 'scss/partials/**/*.scss',
          'scss/_variablesMap.scss': 'scss/variables/**/*.scss',
        },
        options: {
          useSingleQuotes: false,
          signature: '// Hello, World!'
        }
      }
    },
    browserSync: {
        dev: {
            bsFiles: {
                src : [
                    'www/css/*.css',
                    'www/*.html'
                ]
            },
            options: {
                watchTask: true,
                server: './www'
            }
        }
    },
    watch: {
      sass: {
        files: ['**/*.scss'],
        tasks: ['sass'],
      }
    },
  });

  // Default task(s).
  grunt.registerTask('default', ['sass:build', 'browserSync', 'watch']);

  grunt.registerTask('dev', ['sass:dev']);

  grunt.registerTask('build', ['sass:build']);

  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-sass-globbing');
};
