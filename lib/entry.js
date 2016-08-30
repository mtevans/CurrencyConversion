var Status = require('./conversion-status.js');

$(document).ready(function(){
  var needToReset = false;
  var exchangeRatesUSD = "";
  var userInput = "";
  const validChars = {
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
  }

  getUSDRates()

  $(".input").on('keyup click', handleInput)

  $(".convert-button").on('click', handleSubmit)

  function handleInput(e){
    let input = e.target.value;
    let validationArr = parseInput(input);
    if(input === "."){
      addErrorMessage(userInput)
    } else if( validationArr[0] && validationArr[1] !== 0){
      clearErrorMessage()
      userInput = validationArr[1];
      Status.validInput = true;
    } else {
      addErrorMessage(validationArr[1])
      Status.validInput = false;
    }
  }

  function parseInput(input){
    let response = [true, ""];
    let fullStopCount = 0;
    for (var i = 0; i < input.length; i++) {
      if(input[i] === "."){
        fullStopCount += 1;
      }

      if(fullStopCount >= 2){
        response = [false, "Multiple \".\"\'s"]
        return response;
      } else if (validChars[input[i]]){
        response[0] = true;
      } else {
        response = [false, input[i]]
        return response;
      }
    }

    if(fullStopCount === 0){
      input += ".00";
    }

    response[1] = input
    return response;
  }

  function clearErrorMessage(){
    $(".error").text("");
  }

  function addErrorMessage(char){
    $(".error").text("Error: " + char + " is not a valid input. Numbers and one \".\" only please");
  }

  function handleSubmit(){
    if(needToReset){
      resetAnimation();
      return needToReset = false;
    }

    if($('.exchange-box').hasClass('backToUSA')){
       $('.exchange-box').removeClass('backToUSA');
    }

    if($(".error").text().length > 0){
      $(".error").text("Can't submit until you have a valid number");
      return ("");
    }

    $('.button-name').text('Reset');
    $('.instructions').text("Click the Currency Bow!!!");
    let float = parseFloat(userInput);
    let euros = dollarsToEuro(float);

    euros = euros.toFixed(2);
    needToReset = true;
    Status.euros = ('€' + euros);
    armArrow();
  }

  function resetAnimation(){
    $('.side-4').css({"transform": "rotateX(-90deg) translateY(0px) translateZ(100px)"});
    setTimeout(function(){
      $('.exchange-box').addClass('backToUSA').removeClass("move-to-europe");
      $('.USD').removeClass('rotate-90').text(" ").css({'left': '72px','top': '480px'});
      $('.euros').removeClass('drop').text(" ");
      $('.euro-line').css({'opacity': '0'});
      $('.input').val("");
      $('.button-name').text('Convert');
      Status.fired = false;
      Status.euros = "";
      Status.validInput = false
    }, '500')
  }



  function dollarsToEuro(amount){
    let conversionRate = exchangeRatesUSD.rates.EUR;
    return conversionRate * amount;
  }


  function armArrow(){
    $(".USD").text('$' + userInput);
  }


  function getUSDRates(){
    $.ajax({
      method: 'GET',
      url:  'https://api.fixer.io/latest?base=USD',
      success: function(response){
        exchangeRatesUSD = response
        console.log(exchangeRatesUSD)
      },
      error: function(response){
        console.log(response)
      }
    });
  }

  function load(){
    var userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf('mozilla') > -1){
     $('.instructions').css({'left': "37%"})
    }


   if (userAgent.indexOf('safari')!=-1){

     if(userAgent.indexOf('chrome')  > -1){
      console.log("welcome chrome")
    }else{
      $('.instructions').css({'left': "35%"})
     }
    }
  }
load()
})
