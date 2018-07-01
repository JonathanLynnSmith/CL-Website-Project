/********************************************************** 
Admin
***********************************************************/
let reviseableAreas = [
    '.event'
]

let revise = $(".revise");
let modalRevise = $("#modal-revise");


$(document).on('click','.revise', function(event){
    event.preventDefault();
    let eventId = $(this).children('h2').attr('eventId');

    revealModal();
    const myEvent =  window.eventList.find(myEvent => myEvent._id === eventId);
    setForm(myEvent);
})

function revealModal(){
    modalRevise.css("display", "flex");
    // let eventID = $(div).children('h2').attr('eventId');
    // let header = $(div).children('h2').text();
    // let text = $(div).children('p').text();
    // $('#modal-event-id').text(eventID);
    // $('#modal-header').text(header);
    // $('#modal-input').text(text);
}

/*********Check URL For Admin*************/
function checkUrlForAdmin(){
    if(window.location.href.indexOf("admin") > -1){
         reviseableAreas.forEach(function(x){
             $(x).addClass('revise');
         })
         $('#event-wrapper').append(createNewEventBtn());
     }
 };
 /***************************************/

function createNewEventBtn(){
    let newEventHtml = $(`<button class="newEvent">Add New Event</button>`);
    newEventHtml.click(function(){
        revealModal();
        setForm();
    });
    return newEventHtml;
};

function setForm(data){
    data = data || {};

    const formData = {
        eventId: data._id,
        header: data.header,
        paragraph: data.paragraph,
    };

    $('#modal-event-id').val(formData.eventId);
    $('#modal-header').text(formData.header);
    $('#modal-input').text(formData.paragraph);
}


/////////////////Button Functions///////////////


function deleteAdminForm(){
    let eventId = $('#modal-event-id').val();
    let eventIdDiv = $(`[eventId|="${eventId}"]`).parent();
    eventIdDiv.css({"display": "none"});
    modalRevise.css("display","none");
    
    fetch('/api/events/delete/' + eventId, {
        method: 'DELETE',
        body: JSON.stringify({id: eventId}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
};

/****POST****/
function submitAdminForm() {
    modalRevise.css("display","none");

    const formData = {
        eventId: $('#modal-event-id').val(),
        header: $('#modal-header').val(),
        paragraph: $('#modal-input').val(),
    };

    let method , url;
    if(formData.eventId){
        method ='PUT';
        url = '/api/events/' + formData.eventId;
    } else {
        method = 'POST';
        url ='/api/events'
    }

    fetch(url, {
        method: method,
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(file => {
          console.log("we have posted the data", file);
        })
        .catch(err => {
          console.error("A terrible thing has happened", err);
        }) 
  }

  function cancelAdminForm() {
    modalRevise.css("display","none");
    $('#modal-header').text('');
    $('#modal-input').text('');
  }