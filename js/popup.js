// grab the button
let changeColor = document.getElementById('changeColor');
// grab the value of color that we placed on storage
chrome.storage.sync.get('color', data => {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
})

changeColor.onclick = element => {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    // programmatic injection: if you only need your script
    // to be run when a user clicks a button then you shouldn't
    // be injecting javaScript or css into every page that
    // matches your pattern
    console.log('tabs[0]: ', tabs[0]);
    console.log('tabs:', tabs)
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: `document.body.style.backgroundColor = "${color}";` }
      /*
        Usually, instead of injecting code directly like this, you put the code in a file
        and inject the file's contents like this:
        chrome.tabs.executeScript(null, {file: "content_script.js"})
      */
    );
    // To inject CSS, use tabs.insertCSS() instead
  })
}