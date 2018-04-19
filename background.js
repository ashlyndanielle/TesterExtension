// // Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {greeting: "hello"}, function(response) {
//       console.log(response.farewell)
//     });
//   });
// });


/*
  Fired when the extension is first installed, when the extension is updated to a new 
  version, and when Chrome is updated to a new version
*/
chrome.runtime.onInstalled.addListener( () => {
  // storage api used to set values
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is green.');
    console.log('runtime: ', chrome.runtime);
    console.log('----------------------------------');
    console.log('storage: ', chrome.storage);
    console.log('----------------------------------');
    console.log('chrome: ', chrome);
  })
  chrome.storage.sync.get(['color'], result => {
    console.log('The color is currently ', result.color);
  })
})