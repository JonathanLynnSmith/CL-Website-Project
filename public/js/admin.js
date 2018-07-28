/********************************************************** 
Admin
***********************************************************/
let reviseableAreas = [
    '.event'
]
let revise = $(".revise");
let modalRevise = $("#modal-revise");

/*********Check URL For Admin*************/
function checkUrlForAdmin() {
    if (window.location.href.indexOf("admin") > -1) {
        reviseableAreas.forEach(function (x) {
            $(x).addClass('revise');
        })
        $('.newEventButtonContainer').html(createNewEventBtn());
    }
};
/***************************************/

/****Create Button****/
function createNewEventBtn() {
    let newEventHtml = $(`<span class="newEvent">Add New Event</span>`);
    newEventHtml.click(function () {
        revealModal();
        setForm();
    });
    return newEventHtml;
};
/********************/


/****Open/Hide Admin Modal****/
//Allow divs that contain a class called revise to open the admin modal
$(document).on('click', '.revise', function (event) {
    event.preventDefault();
    let eventId = $(this).children('h2').attr('eventId');
    const myEvent = window.eventList.find(myEvent => myEvent._id === eventId);
    setForm(myEvent);
    revealModal(eventId);
})

function revealModal(eventId) {
    modalRevise.css("display", "flex");
    if (eventId) {
        $(".event-delete-btn").show();
    } else {
        $(".event-delete-btn").hide();
    }
}

function hideModal() {
    modalRevise.css("display", "none");
}
/********************/



function setForm(data) {
    data = data || {};

    const formData = {
        eventId: data._id,
        header: data.header,
        paragraph: data.paragraph,
        status: data.status
    };

    $('#modal-event-id').val(formData.eventId);
    $('#modal-header').val(formData.header);
    $('#modal-input').val(formData.paragraph);
}


/////////////////Button Functions///////////////

/****POST****/
function submitAdminForm() {
    modalRevise.css("display", "none");

    const formData = {
        eventId: $('#modal-event-id').val(),
        header: $('#modal-header').val(),
        paragraph: $('#modal-input').val(),
    };

    let method, url;
    if (formData.eventId) {
        method = 'PUT';
        url = '/api/events/' + formData.eventId;
    } else {
        method = 'POST';
        url = '/api/events'
    }

    fetch(url, {
        method: method,
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(file => {
            console.log("we have posted the data", file);
            refreshFileList();
        })
        .catch(err => {
            console.error("A terrible thing has happened", err);
        })
}

/****Cancel****/
function cancelAdminForm() {
    hideModal();
    $('#modal-header').text('');
    $('#modal-input').text('');
}

/****Delete****/
function deleteAdminForm() {
    console.log()
    let eventId = $('#modal-event-id').val();
    modalRevise.css("display", "none");

    fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => refreshFileList())

};