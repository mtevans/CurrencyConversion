/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackMissingModule() { throw new Error("Cannot find module \"./lib/entry.js\""); }());
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Status = __webpack_require__(3);
	
	$(document).ready(function () {
	  $(".bow-and-arrow").on('click', handleShot);
	  $(".bow-and-arrow").on('mouseenter', drawBack).on('mouseleave', releaseDraw);
	  $(".convert-button").on('click', rotateBow);
	
	  function handleShot() {
	    Status.fired = true;
	    $(".USD").css({ "top": "0px" });
	    $(".side-4").css({ "transform": "rotateX(-223deg) translateY(-240px)" });
	    $('.instructions').text("");
	
	    setTimeout(function () {
	      $(".side-4").css({ "transform": "rotateX(-90deg) translateY(0px) translateZ(100px)" });
	      addRotation();
	    }, '400');
	  }
	
	  function addRotation() {
	    $(".exchange-box").addClass("move-to-europe");
	    setTimeout(function () {
	      dropEuros();
	    }, '2300');
	  }
	
	  function dropEuros() {
	    $('.euro-line').css({ 'opacity': '1' });
	    $(".side-4").css({ "transform": "rotateX(-223deg) translateY(-240px)" });
	    $(".euros").text(Status.euros);
	    $(".euros").addClass("drop");
	  }
	
	  function releaseDraw() {
	    if (!Status.fired) {
	      $(".USD").css({ "top": "480px" });
	    }
	  }
	
	  function drawBack() {
	    if (!Status.fired) {
	      $(".USD").css({ "top": "505px" });
	    }
	  }
	
	  function rotateBow() {
	    setTimeout(function () {
	      if (Status.validInput) {
	        $('.bow').addClass('rotate-90');
	        $('.USD').addClass('rotate-90');
	      }
	    }, '500');
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var Status = function Status() {
	  this.euros = "";
	  this.validInput = false;
	  this.fired = false;
	};
	
	module.exports = Status;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map