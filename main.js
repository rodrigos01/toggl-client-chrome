function call(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://togglwrapper.herokuapp.com/"+url, true, email, password);
  // xhr.open("GET", "http://localhost:8080/~rodrigo/toggl-client/me", true, email, password);
  // xhr.setRequestHeader("Authorization", "Basic " + btoa(email + ":" + password));
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // innerText does not let the attacker inject HTML elements.
      document.getElementById("resp").innerText = xhr.responseText;
      var resp = {
        "data": JSON.parse(xhr.responseText),
        "status": xhr.status
      }
      callback(resp);
    }
  }
  xhr.send();
}