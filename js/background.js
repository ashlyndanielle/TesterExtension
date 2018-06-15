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

  to view console.logs click on "Inspect views background page (Inactive)"
  on this page: chrome://extensions/
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
  // adding rules for when extension is available
  // first step is to remove all undefined rules
  // then add rules using new chrome.delcarativeContent.PageStateMatcher
  // list of PageStateMatchers here https://developer.chrome.com/extensions/declarativeContent#type-PageStateMatcher
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [ new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' }
      })],
      // shows the extension's page actions while ^^ conditions are met
      // can be used without host permissions but must have a page action
      actions: [ new chrome.declarativeContent.ShowPageAction() ]
    }])
  })
})
