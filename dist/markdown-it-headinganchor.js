/*! @gerhobbelt/markdown-it-headinganchor 1.2.1-1 https://github.com//adam-p/@gerhobbelt/markdown-it-headinganchor @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitHeadingAnchor = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

'use strict';
/* jshint node:true */

function slugify (s, md) {
  // Unicode-friendly
  var spaceRegex = new RegExp(md.utils.lib.ucmicro.Z.source, 'g');
  return encodeURIComponent(s.replace(spaceRegex, ''));
}

function makeRule (md, options) {
  return function addHeadingAnchors (state) {
    // Go to length-2 because we're going to be peeking ahead.
    for (var i = 0; i < state.tokens.length - 1; i++) {
      if (state.tokens[i].type !== 'heading_open' ||
          state.tokens[i + 1].type !== 'inline') {
        continue;
      }

      // var headingOpenToken = state.tokens[i + 1];
      var headingInlineToken = state.tokens[i + 1];

      if (!headingInlineToken.content) {
        continue;
      }

      var anchorName = options.slugify(headingInlineToken.content, md);

      if (options.addHeadingID) {
        state.tokens[i].attrPush(['id', anchorName]);
      }

      if (options.addHeadingAnchor) {
        var anchorToken = new state.Token('html_inline', '', 0);
        anchorToken.content =
          '<a name="' +
          anchorName +
          '" class="' +
          options.anchorClass +
          '" href="#"></a>';

        headingInlineToken.children.unshift(anchorToken);
      }

      // Advance past the inline and heading_close tokens.
      i += 2;
    }
  };
}

module.exports = function headinganchorPlugin (md, opts) {
  var defaults = {
    anchorClass: 'markdown-it-headinganchor',
    addHeadingID: true,
    addHeadingAnchor: true,
    slugify: slugify
  };
  var options = md.utils.assign(defaults, opts);
  md.core.ruler.push('heading_anchors', makeRule(md, options));
};

},{}]},{},[1])(1)
});
