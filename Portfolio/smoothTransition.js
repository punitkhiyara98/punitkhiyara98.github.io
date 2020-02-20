$('a[href^="#"]').on('click', function(event) {
    var hash = '#' + $(this).attr('href').split('#')[1]
    var element = $(hash)
    if (element.length) {
      event.preventDefault();
      history.pushState(hash, undefined, hash)
      $('html, body').animate({scrollTop: element.offset().top}, 500)
    }
  });   

  window.addEventListener('popstate', function(e) {
    if(e.state && e.state.startsWith('#') && $(e.state).length){
      $('html, body').animate({scrollTop: $(e.state).offset().top}, 500)
    }
  });

  $('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
    $('html, body').stop();
  });// JavaScript Document