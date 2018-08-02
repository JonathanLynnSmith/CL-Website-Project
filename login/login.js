$('#input-username, #input-password').focus(function () {
  $('.username-wrapper').css({ "border": "2px solid transparent" });
  $('.password-wrapper').css({ "border": "2px solid transparent" });
})

$("#input-password, #input-username").keypress(function (e) {
  if (e.which == 13) {
    submitLogin()
  }
});

function submitLogin() {
  const username = $('#input-username').val();
  const password = $('#input-password').val();
  if (!username) {
    $('.username-wrapper').css({ "border": "2px red solid", "border-radius": "5px" }).effect("shake", { distance: 1 });
    return;
  } else if (!password) {
    $('.password-wrapper').css({ "border": "2px red solid", "border-radius": "5px" }).effect("shake", { distance: 1 });;
    return;
  };

  loginData = {
    username: username,
    password: password,
  };

  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => redirectToAdmin(response.status));



  //Checks if login is succesful
  //then redirects to admin page
  function redirectToAdmin(status) {
    if (status == 202) {
      window.location = document.origin + '/admin/';
    } else {
      alert('wrong username or password')
    }
  }
}

