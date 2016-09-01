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
      ",": true
  }

  getUSDRates()

  $(".input").on('keyup click', handleInput)

  $(".big-arrow-button").on('click', handleSubmit)

  function handleInput(e){
    Status.input = e.target.value;
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
    $(".error").text("").css({'opacity':'0'});
  }

  function addErrorMessage(char){
    $(".error").text("Error: Invalid input").css({'opacity':'0.9'});
  }

  function handleSubmit(){
    if(Status.animationInProgress){
      return ""
    }
    if(needToReset){
      resetAnimation();
      return needToReset = false;
    }

    if($('.exchange-box').hasClass('backToUSA')){
       $('.exchange-box').removeClass('backToUSA');
    }

    if($(".error").text().length > 0 || Status.input.length === 0){
      $(".error").text("Can't convert until you have a valid number").css({'opacity':'0.9'});
      return ("");
    }

    $('.button-name').text('Reset');
    let input = "";
    for (var i = 0; i < userInput.length; i++) {
      if(userInput[i] !== ","){
        input += userInput[i]
      }
    }
    let float = parseFloat(input);
    let euros = dollarsToEuro(float);

    euros = euros.toFixed(2);
    needToReset = true;
    Status.euros = (euros);
    armArrow();
  }

  function resetAnimation(){
    Status.animationInProgress = true
    $('.side-4').css({"transform": "rotateX(-90deg) translateY(0px) translateZ(76px)"});
    Status.input = "";
    setTimeout(function(){
      $('.exchange-box').addClass('backToUSA').removeClass("move-to-europe");
      $('.USD').removeClass('rotate-90').text(" ").css({'left': '30px','top': '320px', 'opacity':'0'})
      $('.euros').removeClass('drop').text(" ");
      $('.input').val("");
      $('.first-string').removeClass('vibrate-left');
      $('.second-string').removeClass('vibrate-right');
      $('.first-string').css({'transform': 'rotateZ(0deg)'});
      $('.second-string').css({'transform': 'rotateZ(0deg)'});
      $('.button-name').text('Resetting ...');
      setTimeout(function(){
        $('.button-name').text('Convert');
        $('.USD').addClass("reset90")
        $('.bow').addClass("reset90")
        Status.fired = false;
        Status.euros = "";
        Status.validInput = false;
        setTimeout(function(){
          Status.animationInProgress = false
        }, '500')
      }, '1000')
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

      },
      error: function(response){
        console.log(response)
      }
    });
  }

  function load(){
    var userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf('mozilla') > -1){
      debugger
     $('.instructions').css({'left': "37%"})
    }


   if (userAgent.indexOf('safari')!=-1){

     if(userAgent.indexOf('chrome')  > -1){
      console.log("hey you, how's it going?")
    }else{
      $('.instructions').css({'left': "35%"})
     }
    }
  }
load()
})
