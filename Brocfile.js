 var    compileSass = require('broccoli-sass'),
        concatenate = require('broccoli-concat'),
        mergeTrees  = require('broccoli-merge-trees'),
        pickFiles   = require('broccoli-static-compiler'),
        uglifyJs    = require('broccoli-uglify-js'),
        exportTree = require('broccoli-export-tree'),
        app = 'client',
        treeToExport,
        appHtml,
        appJs;

appHtml = pickFiles(app, {
        srcDir  : '/',
        destDir : '/'
    });

appJs = concatenate(app, {
        inputFiles : [
        'bower_components/moment/min/moment.min.js',
        'bower_components/underscore/underscore-min.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-resource/angular-resource.min.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/hammerjs/hammer.js',
        'bower_components/angular-material/angular-material.min.js',
        'js/**/*.js'
        ],
        outputFile : '/all.js',
        header     : '/** Copyright Modus Create Inc. 2014 **/'
    });
    appJs = uglifyJs(appJs, {
        compress: true
    });

treeToExport = mergeTrees([appHtml, appJs]);

exportTree(treeToExport, {
  destDir: 'public'
});

module.exports = treeToExport;
