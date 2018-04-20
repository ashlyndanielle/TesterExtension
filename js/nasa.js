
window.onload = () => {
  $.get(apod)
  .done( setApodInfo )
  .fail( err => console.log(err) )
}

const apod = "https://api.nasa.gov/planetary/apod?" + $.param({
  'api_key': config.nasaKey,
  'count': 5
})

let author;
let description;

function setApodInfo(data) {
  console.log(data);
  // $('#container').css('background-image', 'url("' + data[0].url + '")');
  $('#nasa-img').attr('src', data[0].url);
  if (data[0].copyright) author = data[0].copyright;
  description = data[0].explanation;
}

