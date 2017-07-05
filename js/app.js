/********************************************************** 
Weather Application at top of page
***********************************************************/
var weatherAPI = "http://api.wunderground.com/api/2e843102da35bfb9/conditions/q/40047.json";
var weatherMethod = function(data) {
    console.log(data);
    var currentTemp = '<h1> ' + data.current_observation.temp_f + 'F </h1>';
    $('.temp-gadge').append(currentTemp);
};
// $.getJSON(weatherAPI, weatherMethod);



/********************************************************** 
Applying checkmark after newletter signup
***********************************************************/
var newsletterButton = $("#newsletter-button");
var newsletterForm = $("#newsletter-form");

newsletterButton.click( function(){
    event.preventDefault();
    newsletterForm.after('<p>Thank You! &#10004</p>');
    $("form p").addClass("checkmark");
    newsletterButton.detach();
    newsletterForm.detach();
    console.log(newsletterForm.val());
});


/********************************************************** 
Forms and Documents modal
***********************************************************/
var modal = $("#modal");
var modalBtn = $("#forms-docs-btn");
var modalClose= $(".modal-close")

// When the user clicks the button, open the modal 
modalBtn.click(function(){
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