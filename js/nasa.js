$(document).ready(function() {

  const apod = "https://api.nasa.gov/planetary/apod?" + $.param({
    'api_key': config.nasaKey,
    'count': 5
  });

  let section = 'home';
  let nytArticles = `https://api.nytimes.com/svc/topstories/v2/${section}.json?` + $.param({
    'api-key': config.nytKey
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
    caption.css('color', '#6e24b3');
  }, () => {
    caption.css('color', 'white');
  })




  window.onload = () => {
    getApodInfo();
    getNytInfo();
  }
  
  function getApodInfo() {
    $.get(apod)
    .done( setApodInfo )
    .fail( err => console.log(err) )
  }

  function setApodInfo(data) {
    console.log(data);
    // account for when url is a video
    for ( let x = 0; x < data.length; x++ ) {
      if (checkURL(data[x].url)) {
        nasaImg.attr('src', data[x].url);
        break;
      }
    }
    if (data[0].copyright) author = data[0].copyright;
    description = data[0].explanation;
  }

  function getNytInfo() {
    $.get( nytArticles )
    .done( setArticles )
    .fail( err => console.log(err) )
  }

  function setArticles(data) {
    console.log(data.results);
  }

  function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
})