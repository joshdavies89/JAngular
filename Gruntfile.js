module.exports = function(grunt) {
  // Load tasks automatically with 'load-grunt-tasks' plugin.
  require('load-grunt-tasks')(grunt);

  // Define our theme directory
  var themeDir = 'www';
  // Specify where to find dependencies we load in with Bower
  var sassLib = ['lib'];
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
    watch: {
      sass: {
        files: ['**/*.scss'],
        tasks: ['sass'],
      }
    },
  });

  // Default task(s).
  grunt.registerTask('default', ['sass:build']);

  grunt.registerTask('dev', ['sass:dev']);

  grunt.registerTask('build', ['sass:build']);

};
