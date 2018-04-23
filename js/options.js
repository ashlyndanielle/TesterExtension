const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
const buttonContainer = document.getElementById('btn-options');
function constructOptions(kButtonColors) {
  // add a button for each color that will set the color
  // property on storage to the color of that button
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    buttonContainer.appendChild(button);
  }
}
constructOptions(kButtonColors);