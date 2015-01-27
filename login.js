document.querySelector('#loginTemplate').login = function() {
  var email = document.querySelector("#email").value;
  var password = document.querySelector("#password").value;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://togglwrapper.herokuapp.com/me", true, email, password);
  // xhr.open("GET", "http://localhost:8080/~rodrigo/toggl-client/me", true, email, password);
  // xhr.setRequestHeader("Authorization", "Basic " + btoa(email + ":" + password));
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      if(xhr.status === 200) {
        var current =  chrome.app.window.current();
        current.hide();
        chrome.storage.sync.set({"apiToken": resp.data.api_token}, function() {
          chrome.app.window.create('index.html',
            {
              id: 'mainWindow',
              innerBounds: {width: 360, height: 640},
              resizable: false
            }
          );
        });
      }
    }
  }
  xhr.send();
}