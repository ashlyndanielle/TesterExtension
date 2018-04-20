const apod = "https://api.nasa.gov/planetary/apod?" + $.param({
  'api_key': config.nasaKey,
  'count': 5
});

const nasaContainer = $('#container');
const nasaImg = $('#nasa-img');
const caption = $('.nasa-caption');

let author;
let description;

nasaContainer.hover( () => {
  setTimeout( () => {
    caption.fadeIn();
  }, 300)
}, () => {
  caption.hide();
})

caption.hover( () => {
  $(this).style.color = 'red';
}, () => {
  $(this).style.color = 'white';
})




window.onload = () => {
  $.get(apod)
  .done( setApodInfo )
  .fail( err => console.log(err) )
}

function setApodInfo(data) {
  console.log(data);
  // $('#container').css('background-image', 'url("' + data[0].url + '")');
  nasaImg.attr('src', data[0].url);
  if (data[0].copyright) author = data[0].copyright;
  description = data[0].explanation;
}

