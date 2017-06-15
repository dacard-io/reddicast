// SITE SCRIPTS

// Document Ready
$(function() {


//*** Smooth scroll
$('a[href*="#"]:not([href="#"])').click(function() {
if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
  var target = $(this.hash);
  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
  if (target.length) {
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000);
    return false;
  }
}});


}); // End of Document Ready

// Push menu button action
$('.push-menu-button').on("mousedown", function(){
  $('.push-menu').toggleClass('open');
  $('.app-wrapper').toggleClass('menu-open');
})

$('.about-app').on("mousedown", function(){
  $('body').toggleClass('no-v-scroll');
  $('.popover').toggleClass('invisible');
  $('.app-wrapper').toggleClass('blur');
})
$('.popover').on("mousedown", function(){
  $('body').toggleClass('no-v-scroll');
  $('.popover').toggleClass('invisible');
  $('.app-wrapper').toggleClass('blur');
})