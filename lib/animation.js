var Status = require('./conversion-status.js');

$(document).ready(function(){
  $(".bow-and-arrow").on('click', handleShot)
  $(".bow-and-arrow").on('mouseenter', drawBack)
  $(".bow-and-arrow").on('mouseleave', releaseDraw)
  $(".convert-button").on('click', rotateBow )


  function handleShot(){
    $(".USD").css({"top": "0px"})
    $(".side-4").css({"transform": "rotateX(-223deg) translateY(-240px)"})
    $('.instructions').text("")
    Status.fired = true
    setTimeout(function(){
      $(".side-4").css({"transform": "rotateX(-90deg) translateY(0px) translateZ(100px)"})
      addRotation()
    }, '400')
  }

  function addRotation(){
    $(".exchange-box").addClass("move-to-europe")
    setTimeout(function(){
      dropEuros()

    }, '2300')
  }

  function dropEuros(){
    $('.euro-line').css({'opacity':'1'})
    $(".side-4").css({"transform": "rotateX(-223deg) translateY(-240px)"})
    $(".euros").text(Status.euros)
    $(".euros").addClass("drop")
  }

  function releaseDraw(){
    if(!Status.fired){
      $(".USD").css({"top": "480px"})
    }
  }

  function drawBack(){
    if( !Status.fired){
      $(".USD").css({"top": "505px"})
    }
  }

  function rotateBow(){
      setTimeout(function(){
        if (Status.validInput){
          $('.bow').addClass('rotate-90')
          $('.USD').addClass('rotate-90')
        }
      }, '500')
  }

})
