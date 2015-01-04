module.exports = function(grunt) {

  var initConfig, config = grunt.file.readJSON('config/config.json');

  // Project configuration.
  grunt.initConfig(initConfig = {
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: "\n", //add a new line after each file
        banner: "", //added before everything
        footer: "" //added after everything
      },
      libs: {
        src: config.imports.js,
        dest: 'Dist/js/app.js',
        nonull: true
      },
      dist: {
        src: [
        'Dist/js/app.js',
        '!App/src/**/main.js',
        'App/src/modules/*/*.js',
        'App/src/**/*.js',
        '!App/src/modules/*/resource/**/*.js',
        '!App/src/modules/_templeModule/**/*.js',
        'App/src/main.js'
        ],
        // the location of the resulting JS file
        dest: 'Dist/js/app.js',
        nonull: true
      }

    },
    less: {
      development: {
        options: {
          paths: ["App/src/modules", "App/libs"],
          strictMath: true
        },
        files: {
          "Dist/resource/css/app.css": "Dist/resource/css/app.css"
        }
      }
    },
    copy: {
      modules: {
        files: [{
          cwd: 'App/src/modules/',
          src: ['**/*.html','!resource/**/*.js','!_templeModule/**','resource/**'],
          dest: 'Dist/src/modules/',
          expand: true
        }]
      },
      resource: {
        files: [{
          cwd: 'App/resource/',
          src: ['**/*','!**/*.less'],
          dest: 'Dist/resource/',
          expand: true
        }]

      }
    },
    clean: {
      dist: {
        src: ["Dist"]
      }
    },
    watch: {
      app: {
        files: ['App/**'],
        tasks: ['copy','lessImporter', 'less'],
        options: {
          livereload: true
        }
      },
      config: {
        files: ['config/config.json'],
        tasks: ['updateConfig', 'concat'],
        options: {
          interrupt: false,
          livereload: true,
          spawn: false
        }
      },
      index: {
        files: ['App/index.html'],
        tasks: ['copyIndex'],
        options: {
          interrupt: false,
          livereload: true
        }
      },
      js: {
        files: ['App/src/**/*.js'],
        tasks: ['concat'],
        options: {
          interrupt: false,
          livereload: true
        }
      },
      less: {
        files: ['App/**/*.less'],
        tasks: ['lessImporter', 'less'],
        options: {
          livereload: true
        }
      },
      templates: {
        files: ['App/src/**/*.html'],
        tasks: ['copy'],
        options: {
          interrupt: false,
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          livereload: true,
          base: 'Dist/',
          port: config.port,
          hostname: 'localhost',
          open: true,
        },
        livereload: {
          options: {
            open: {
              target: 'http://localhost:'+  config.port
            },
            base: [
            'Dist'
            ]
          }
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // Create LESS importer file
  grunt.registerTask('lessImporter', function() {
    var mainLess = "";
    grunt.file.recurse('App/src/modules', function(abspath, rootdir, subdir, filename) {
      if (filename.toLowerCase().slice(-5) == '.less') {
        mainLess += "@import '/" + abspath + "';\n\r";
      }
    });
    grunt.file.write('Dist/resource/css/app.css', mainLess);
  });


  // Reads the config file and updates any config references
  grunt.registerTask('updateConfig', function() {
    config = grunt.file.readJSON('config/config.json');

    // Set concat.libs config
    initConfig.concat.libs.src = config.imports.js;
    grunt.config('concat', initConfig.concat);
  });

  // create a new app module
  grunt.registerTask('createModule', function() {
      var name = grunt.option('name');
      var folderPath = 'App/src/modules/'+name+'Module';
      grunt.file.mkdir(folderPath);
      grunt.file.mkdir(folderPath+"/controllers");
      grunt.file.mkdir(folderPath+"/directives");
      grunt.file.mkdir(folderPath+"/styles");
      grunt.file.mkdir(folderPath+"/templates");

      //add files
      createModuleFile(folderPath,'demoModule.js',name,name+"Module.js");
      createModuleFile(folderPath,'controllers/exampleController.js',name,"controllers/"+name+"Controller.js");
      createModuleFile(folderPath,'directives/exampleDirective.js',name,"directives/"+name+"Directive.js");
      createModuleFile(folderPath,'styles/exampleStyle.less',name,"styles/"+name+"Style.less",true);
      createModuleFile(folderPath,'templates/exampleTemplate.html',name,"templates/"+name+".html",true);

      var content = grunt.file.read('App/src/main.js');
      var lines = content.split('\n');
      lines[0] = lines[0].replace(']);',",'"+name+"'"+']);');
      var content = lines.join('');
      var content = grunt.file.write('App/src/main.js',content);
      console.log('created a new module called '+name);

  });

  function createModuleFile(folderPath,filePath,name,fileName,camelCase){
      var re = new RegExp('--example--', 'g');
      var content = grunt.file.read('config/_templateModule/'+filePath);
      content=content.replace(re,camelCase?camelToDash(name):name);
      grunt.file.write(folderPath+"/"+fileName, content);
  }
  function camelToDash(str) {
      return str.replace(/\W+/g, '-')
                .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
   }


  // Create Index File
  grunt.registerTask('copyIndex', function() {

    var content = grunt.file.read('App/index.html');

    var cssString = '<link type="text/css" rel="stylesheet" href="resource/css/app.css" />\n\r';
    var jsString = '<script type="text/javascript" src="js/app.js"></script>\n\r';
    content = content.replace('</head>', cssString + jsString + "</head>");

    grunt.file.write('Dist/index.html', content);
  });

  grunt.registerTask('default', ['clean','concat', 'lessImporter', 'less', 'copy', 'copyIndex', 'connect', 'watch']);

};
