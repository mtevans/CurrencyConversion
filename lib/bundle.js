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
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Status = __webpack_require__(2);
	
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
	    ".": true,
	    ",": true
	  };
	
	  getUSDRates();
	
	  $(".input").on('keyup click', handleInput);
	
	  $(".big-arrow-button").on('click', handleSubmit);
	
	  function handleInput(e) {
	    Status.input = e.target.value;
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
	    $(".error").text("").css({ 'opacity': '0' });
	  }
	
	  function addErrorMessage(char) {
	    $(".error").text("Error: Invalid input").css({ 'opacity': '0.9' });
	  }
	
	  function handleSubmit() {
	    if (Status.animationInProgress) {
	      return "";
	    }
	    if (needToReset) {
	      resetAnimation();
	      return needToReset = false;
	    }
	
	    if ($('.exchange-box').hasClass('backToUSA')) {
	      $('.exchange-box').removeClass('backToUSA');
	    }
	
	    if ($(".error").text().length > 0 || Status.input.length === 0) {
	      $(".error").text("Can't convert until you have a valid number").css({ 'opacity': '0.9' });
	      return "";
	    }
	
	    $('.button-name').text('Reset');
	    var input = "";
	    for (var i = 0; i < userInput.length; i++) {
	      if (userInput[i] !== ",") {
	        input += userInput[i];
	      }
	    }
	    var float = parseFloat(input);
	    var euros = dollarsToEuro(float);
	
	    euros = euros.toFixed(2);
	    needToReset = true;
	    Status.euros = euros;
	    armArrow();
	  }
	
	  function resetAnimation() {
	    Status.animationInProgress = true;
	    $('.side-4').css({ "transform": "rotateX(-90deg) translateY(0px) translateZ(76px)" });
	    Status.input = "";
	    setTimeout(function () {
	      $('.exchange-box').addClass('backToUSA').removeClass("move-to-europe");
	      $('.USD').removeClass('rotate-90').text(" ").css({ 'left': '30px', 'top': '320px', 'opacity': '0' });
	      $('.euros').removeClass('drop').text(" ");
	      $('.input').val("");
	      $('.first-string').removeClass('vibrate-left');
	      $('.second-string').removeClass('vibrate-right');
	      $('.first-string').css({ 'transform': 'rotateZ(0deg)' });
	      $('.second-string').css({ 'transform': 'rotateZ(0deg)' });
	      $('.button-name').text('Resetting ...');
	      setTimeout(function () {
	        $('.button-name').text('Convert');
	        $('.USD').addClass("reset90");
	        $('.bow').addClass("reset90");
	        Status.fired = false;
	        Status.euros = "";
	        Status.validInput = false;
	        setTimeout(function () {
	          Status.animationInProgress = false;
	        }, '500');
	      }, '1000');
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
	      url: 'https://api.fixer.io/latest?base=USD',
	      success: function success(response) {
	        exchangeRatesUSD = response;
	      },
	      error: function error(response) {
	        console.log(response);
	      }
	    });
	  }
	
	  function load() {
	    var userAgent = navigator.userAgent.toLowerCase();
	
	    if (userAgent.indexOf('mozilla') > -1) {
	      debugger;
	      $('.instructions').css({ 'left': "37%" });
	    }
	
	    if (userAgent.indexOf('safari') != -1) {
	
	      if (userAgent.indexOf('chrome') > -1) {
	        console.log("hey you, how's it going?");
	      } else {
	        $('.instructions').css({ 'left': "35%" });
	      }
	    }
	  }
	  load();
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var Status = function Status() {
	  this.euros = "";
	  this.validInput = false;
	  this.fired = false;
	  this.input = "";
	  this.animationInProgress = false;
	};
	
	module.exports = Status;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Status = __webpack_require__(2);
	
	$(document).ready(function () {
	  var buttonOn = false;
	  $(".big-arrow-button").on('click', triggerAnimationSequence);
	  $(".arrow").on('mouseenter', handleButton).on('mouseleave', handleButton);
	  $(".underline-button").on('mouseenter', handleButton).on('mouseleave', handleButton);
	
	  function triggerAnimationSequence() {
	    if ((Status.input === undefined || Status.input.length > 0) && Status.validInput && !Status.fired && !Status.animationInProgress) {
	      Status.animationInProgress = true;
	      $('.button-name').text('Converting ...');
	      rotateBow();
	    }
	  }
	
	  function handleButton() {
	    if (buttonOn) {
	      buttonOn = false;
	      $(".underline-button").css({ 'background': 'rgba(255, 253, 253, 0.68)' });
	      $(".arrow").css({ 'border-left': '45px solid rgba(255, 253, 253, 0.68)' });
	    } else {
	      buttonOn = true;
	      $(".underline-button").css({ 'background': 'rgba(255, 253, 253, 0.9)' });
	      $(".arrow").css({ 'border-left': '45px solid rgba(255, 253, 253, 0.9)' });
	    }
	  }
	
	  function handleShot() {
	    Status.fired = true;
	    bowFireAnimation();
	    $(".USD").css({ "top": "0px" });
	    $(".side-4").css({ "transform": "rotateX(-222deg) translateY(-180px)" });
	    $('.instructions').text("");
	
	    setTimeout(function () {
	      $(".side-4").css({ "transform": "rotateX(-90deg) translateY(0px) translateZ(76px)" });
	      addRotation();
	    }, '1000');
	  }
	
	  function bowFireAnimation() {
	    $('.first-string').addClass('vibrate-left');
	    $('.second-string').addClass('vibrate-right');
	  }
	
	  function addRotation() {
	    $(".exchange-box").addClass("move-to-europe");
	    setTimeout(function () {
	      dropEuros();
	      setTimeout(function () {
	        $('.button-name').text('Reset');
	      }, '800');
	    }, '2300');
	  }
	
	  function dropEuros() {
	    $('.euro-line').css({ 'opacity': '1' });
	    $(".side-4").css({ "transform": "rotateX(-222deg) translateY(-180px)" });
	    $(".euros").text(Status.euros);
	    $(".euros").addClass("drop");
	    setTimeout(function () {
	      Status.animationInProgress = false;
	    }, '500');
	  }
	
	  function rotateBow() {
	    setTimeout(function () {
	      $('.bow').removeClass("reset90").addClass('rotate-90');
	      $('.USD').removeClass("reset90").addClass('rotate-90');
	      drawBack();
	    }, '100');
	  }
	
	  function drawBack() {
	    setTimeout(function () {
	      $('.USD').css({ 'opacity': '1' });
	      $(".USD").css({ "top": "370px" });
	      $('.first-string').css({ 'transform': 'rotateZ(24deg)' });
	      $('.second-string').css({ 'transform': 'rotateZ(-24deg)' });
	      setTimeout(function () {
	
	        handleShot();
	      }, '1000');
	    }, '900');
	  }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map