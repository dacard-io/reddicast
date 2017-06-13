// SITE SCRIPTS

var fav_subs = [
]
var posts = [
  {key: 1, title: "WW2 Started by who?", description: "Lorem Lipsum"},
  {key: 2, title: "WW2 Started by who?", description: "Lorem Lipsum"},
  {key: 3, title: "WW2 Started by who?", description: "Lorem Lipsum"},
  {key: 4, title: "WW2 Started by who?", description: "Lorem Lipsum"},
  {key: 5, title: "WW2 Started by who?", description: "Lorem Lipsum"},
] // Example of what React is going to be using to manipulate the DOM

/* 
Alot simpler then before. Lets try to mimize the usage of React, and all it will do is place posts in the dom using the array above.
We can create a simple API to automatically add to 
*/

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

// When window finishes loading
$(window).on('load', function(){

  $(window).resize(function() {
    //post_container.packery(isotope_properties);
  });

});

// Push menu button action
$('.push-menu-button').on("mousedown", function(){
  $('.push-menu').toggleClass('open');
  $('.app-wrapper').toggleClass('menu-open');
})

// Declare way point to load more posts
var waypoint = $('.loading-posts').waypoint(function(direction) {
    // Events go here
    if (direction == "down") {
      console.log("Pull more posts");
    }
}, {
    offset: '100%' // Trigger event at element
})
