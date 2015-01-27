function call(url, callback) {
  chrome.storage.sync.get('apiToken', function(data) {
    var token = data.apiToken;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://togglwrapper.herokuapp.com/"+url, true, token, "api_token");
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var resp = {
          "data": JSON.parse(xhr.responseText),
          "status": xhr.status
        }
        callback(resp);
      }
    }
    xhr.send();
  });
}

function populateEntries() {
  call("time_entries", function(res) {
    for(entry in res.data) {
      var div = document.createElement("paper-shadow");
      div.setAttribute("z", 3);
      div.setAttribute("animated", "true");
      div.innerHTML = res.data[entry].description;
      document.querySelector("#entries").appendChild(div);
    }
  });
}