chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      // this gives you the url of the first external link on the page
      var firstHref = $("a[href^='http']").eq(0).attr("href");
      console.log(firstHref);
    }
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.greeting === "hello") {
      sendResponse({farewell: "goodbye"})
    }
  }
);
