/**
 * Listens for the app launching then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.storage.sync.get('apiToken', function(data) {
    if("apiToken" in data) {
      chrome.app.window.create(
        'index.html',
        {
          id: 'mainWindow',
          innerBounds: {width: 360, height: 640},
          resizable: false
        }
      );
    } else {
      chrome.app.window.create(
        'login.html',
        {
          id: 'loginWindow',
          innerBounds: {width: 360, height: 360},
          resizable: false
        }
      );
    }
  })
});
