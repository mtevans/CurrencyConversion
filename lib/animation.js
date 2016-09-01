var Status = require('./conversion-status.js');

$(document).ready(function(){
  var buttonOn = false
  $(".big-arrow-button").on('click', triggerAnimationSequence );
  $(".arrow").on('mouseenter', handleButton).on('mouseleave', handleButton)
  $(".underline-button").on('mouseenter', handleButton).on('mouseleave', handleButton)


  function triggerAnimationSequence(){
    if(( Status.input === undefined || Status.input.length > 0 ) && Status.validInput && !Status.fired && !Status.animationInProgress){
      Status.animationInProgress = true
      $('.button-name').text('Converting ...');
      rotateBow()
    }
  }

  function handleButton(){
    if(buttonOn){
      buttonOn = false
      $(".underline-button").css({'background':'rgba(255, 253, 253, 0.68)'})
      $(".arrow").css({'border-left': '45px solid rgba(255, 253, 253, 0.68)'})
    } else {
      buttonOn = true
      $(".underline-button").css({'background':'rgba(255, 253, 253, 0.9)'})
        $(".arrow").css({'border-left': '45px solid rgba(255, 253, 253, 0.9)'})
    }
  }

  function handleShot(){
      Status.fired = true;
      bowFireAnimation()
      $(".USD").css({"top": "0px"});
      $(".side-4").css({"transform": "rotateX(-222deg) translateY(-180px)"});
      $('.instructions').text("");

      setTimeout(function(){
        $(".side-4").css({"transform": "rotateX(-90deg) translateY(0px) translateZ(76px)"});
        addRotation();
      }, '1000')
    }

    function bowFireAnimation(){
      $('.first-string').addClass('vibrate-left')
      $('.second-string').addClass('vibrate-right')
    }

    function addRotation(){
      $(".exchange-box").addClass("move-to-europe");
      setTimeout(function(){
        dropEuros();
        setTimeout(function(){
          $('.button-name').text('Reset')
        }, '800')
      }, '2300')
    }


  function dropEuros(){
    $('.euro-line').css({'opacity':'1'});
    $(".side-4").css({"transform": "rotateX(-222deg) translateY(-180px)"});
    $(".euros").text(Status.euros);
    $(".euros").addClass("drop");
    setTimeout(function(){
      Status.animationInProgress = false
    }, '500')
  }




  function rotateBow(){
    setTimeout(function(){
          $('.bow').removeClass("reset90").addClass('rotate-90');
          $('.USD').removeClass("reset90").addClass('rotate-90');
          drawBack()
    }, '100')
  }

  function drawBack(){
    setTimeout(function(){
      $('.USD').css({'opacity': '1'})
      $(".USD").css({"top": "370px"});
      $('.first-string').css({'transform': 'rotateZ(24deg)'});
      $('.second-string').css({'transform': 'rotateZ(-24deg)'});
      setTimeout(function(){

        handleShot()
      }, '1000')


    }, '900')

  }


})
