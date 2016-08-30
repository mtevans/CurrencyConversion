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

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Status = __webpack_require__(3);
	
	$(document).ready(function () {
	  var needToReset = false;
	  var exchangeRatesUSD = "";
	  var userInput = "";
	  var validChars = {
	    "0": true,
	    "1": true,
	    "2": true,
	    "3": true,
	    "4": true,
	    "5": true,
	    "6": true,
	    "7": true,
	    "8": true,
	    "9": true,
	    ".": true
	  };
	
	  getUSDRates();
	
	  $(".input").on('keyup click', handleInput);
	
	  $(".convert-button").on('click', handleSubmit);
	
	  function handleInput(e) {
	    var input = e.target.value;
	    var validationArr = parseInput(input);
	    if (input === ".") {
	      addErrorMessage(userInput);
	    } else if (validationArr[0] && validationArr[1] !== 0) {
	      clearErrorMessage();
	      userInput = validationArr[1];
	      Status.validInput = true;
	    } else {
	      addErrorMessage(validationArr[1]);
	      Status.validInput = false;
	    }
	  }
	
	  function parseInput(input) {
	    var response = [true, ""];
	    var fullStopCount = 0;
	    for (var i = 0; i < input.length; i++) {
	      if (input[i] === ".") {
	        fullStopCount += 1;
	      }
	
	      if (fullStopCount >= 2) {
	        response = [false, "Multiple \".\"\'s"];
	        return response;
	      } else if (validChars[input[i]]) {
	        response[0] = true;
	      } else {
	        response = [false, input[i]];
	        return response;
	      }
	    }
	
	    if (fullStopCount === 0) {
	      input += ".00";
	    }
	
	    response[1] = input;
	    return response;
	  }
	
	  function clearErrorMessage() {
	    $(".error").text("");
	  }
	
	  function addErrorMessage(char) {
	    $(".error").text("Error: " + char + " is not a valid input. Numbers and one \".\" only please");
	  }
	
	  function handleSubmit() {
	    if (needToReset) {
	      resetAnimation();
	      return needToReset = false;
	    }
	
	    if ($('.exchange-box').hasClass('backToUSA')) {
	      $('.exchange-box').removeClass('backToUSA');
	    }
	
	    if ($(".error").text().length > 0) {
	      $(".error").text("Can't submit until you have a valid number");
	      return "";
	    }
	
	    $('.button-name').text('Reset');
	    $('.instructions').text("Click the Currency Bow!!!");
	    var float = parseFloat(userInput);
	    var euros = dollarsToEuro(float);
	
	    euros = euros.toFixed(2);
	    needToReset = true;
	    Status.euros = '€' + euros;
	    armArrow();
	  }
	
	  function resetAnimation() {
	    $('.side-4').css({ "transform": "rotateX(-90deg) translateY(0px) translateZ(100px)" });
	    setTimeout(function () {
	      $('.exchange-box').addClass('backToUSA').removeClass("move-to-europe");
	      $('.USD').removeClass('rotate-90').text(" ").css({ 'left': '72px', 'top': '480px' });
	      $('.euros').removeClass('drop').text(" ");
	      $('.euro-line').css({ 'opacity': '0' });
	      Status.fired = false;
	      $('.input').val("");
	      $('.button-name').text('Convert');
	      Status.euros = "";
	    }, '500');
	  }
	
	  function dollarsToEuro(amount) {
	    var conversionRate = exchangeRatesUSD.rates.EUR;
	    return conversionRate * amount;
	  }
	
	  function armArrow() {
	    $(".USD").text('$' + userInput);
	  }
	
	  function getUSDRates() {
	    $.ajax({
	      method: 'GET',
	      url: 'http://api.fixer.io/latest?base=USD',
	      success: function success(response) {
	        exchangeRatesUSD = response;
	      }
	    });
	  }
	
	  function load() {
	    var userAgent = navigator.userAgent.toLowerCase();
	
	    if (userAgent.indexOf('mozilla') > -1) {
	      $('.instructions').css({ 'left': "37%" });
	    }
	
	    if (userAgent.indexOf('safari') != -1) {
	
	      if (userAgent.indexOf('chrome') > -1) {
	        console.log("welcome chrome");
	      } else {
	        $('.instructions').css({ 'left': "35%" });
	      }
	    }
	  }
	  load();
	});

/***/ },
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