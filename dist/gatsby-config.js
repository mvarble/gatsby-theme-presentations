"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeConfig;

var _types = require("./types");

// development flag for whether or not we show drafts
var DEVELOPMENT = process && process.env && process.env.NODE_ENV === 'development';

function makeConfig(options) {
  // parse the options
  var _defaultOptions = (0, _types.defaultOptions)(options),
      sourceDir = _defaultOptions.sourceDir; // source post files in the source directory


  return {
    plugins: [{
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'presentations',
        path: sourceDir,
        ignore: DEVELOPMENT ? ["**/.*.mdx"] : ["**/.*.mdx", "**/*.draft.*"]
      }
    }]
  };
}