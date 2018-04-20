
window.onload = () => {
  $.get(apod)
  .done( setBackgroundImage )
  .fail( err => console.log(err) )
}

const apod = "https://api.nasa.gov/planetary/apod?" + $.param({
  'api_key': config.nasaKey
})

function setBackgroundImage(data) {
  $('#container').css('background-image', 'url("' + data.hdurl + '")');
}