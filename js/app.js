/********************************************************** 
Weather Application at top of page
***********************************************************/
var weatherAPI = "https://api.wunderground.com/api/2e843102da35bfb9/conditions/q/40047.json";
var weatherMethod = function(data) {
    console.log(data);
    var currentTemp = '<h1> ' + data.current_observation.temp_f + 'F </h1>';
    $('.temp-gadge').append(currentTemp);
};
// $.getJSON(weatherAPI, weatherMethod);



/********************************************************** 
Applying checkmark after newletter signup
***********************************************************/
var newsletterButton = $("#newsletter-btn");
var newsletterForm = $("#newsletter-form");
var newsletterWrapper = $(".sign-up-wrapper")

newsletterButton.click( function(event){
    event.preventDefault();
    $("form p").addClass("checkmark");
    newsletterForm.after('<p>Thank You!</p>');
    newsletterButton.remove();
    newsletterForm.remove();
    newsletterWrapper.removeClass();
});


/********************************************************** 
Forms and Documents modal
***********************************************************/
var modal = $("#modal");
var modalBtn = $("#forms-docs-btn");
var modalClose= $(".modal-close")

// When the user clicks the button, open the modal 
modalBtn.click(function(event){
    event.preventDefault();
    modal.css("display", "block");
});

// When the user clicks on <span> (x), close the modal
 modalClose.click(function(){
    modal.css("display", "none")
 });

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if ($(event.target).attr("id") == "modal") {
        modal.css("display", "none")
    }
};

/********************************************************** 
Board Members scroll animation activator
***********************************************************/

var $boardMembers = $('.board-members')
var $win = $(window);


// $win.resize(function(){
//     var $width = $win.width();
//     console.log($width);
// });

$win.on('scroll', function () {
    var top = $win.scrollTop();
    var $width = $win.width();
    if (top > 800 && $width > 1000){
        $boardMembers.css('visibility', 'visible').addClass('animated fadeInDown')
    }
      if(top < 700 && $width < 1000)  {
            $boardMembers.css('visibility', 'visible').addClass('animated fadeInDown')
        }
}); 

/********************************************************** 
Href Scroll Animation
***********************************************************/
$('a[href^="#"]').on('click','resize', function (e) {
    e.preventDefault();

    var target =this.hash
    var $target = $(target);

    $('html, body').animate({
        'scrollTop': $target.offset().top
    }, 500, 'swing');
});