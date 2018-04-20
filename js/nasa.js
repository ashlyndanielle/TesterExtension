
window.onload = () => {
  $.get(apod)
  .done( changeBackground )
  .fail( err => console.log(err) )
}

const apod = "https://api.nasa.gov/planetary/apod?" + $.param({
  'api_key': config.nasaKey
})

function changeBackground(data) {
  console.log(data.hdurl)
}