// grab the button
window.onload = () => {
  console.log('working');
}
let changeColor = document.getElementById('changeColor');
// grab the value of color that we placed on storage
chrome.storage.sync.get('color', data => {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
})

changeColor.addEventListener('click', () => {
  console.log('clicked');
})