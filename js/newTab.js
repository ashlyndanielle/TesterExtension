$(document).ready(function() {

  const nasaContainer = $('#nasa-container');
  const nasaImg = $('#nasa-img');
  const caption = $('.nasa-caption');
  let author;
  let description;

  const apod = "https://api.nasa.gov/planetary/apod?" + $.param({
    'api_key': config.nasaKey,
    'count': 5
  });

  let section = 'home';
  let selection = 'World';
  let nytArticles = `https://api.nytimes.com/svc/topstories/v2/${section}.json?` + $.param({
    'api-key': config.nytKey
  });

  // retrieve data
  window.onload = () => {
    getApodInfo();
    getNytInfo();
  }

  // show caption button on hover
  nasaContainer.hover( () => {
    setTimeout( () => {
      caption.fadeIn();
    }, 300)
  }, () => {
    caption.hide();
  })

  // change button color on hover
  caption.hover( () => {
    caption.css('color', '#6e24b3');
  }, () => {
    caption.css('color', 'white');
  })

  caption.on('click', () => {
    console.log('caption was clicked');
    caption.css('height', '')
  })

  // nasa api call
  function getApodInfo() {
    $.get(apod)
    .done( setApodInfo )
    .fail( err => console.log(err) )
  }

  // display nasa image
  function setApodInfo(data) {
    console.log(data);
    // account for when url is a video
    for ( let x = 0; x < data.length; x++ ) {
      if (checkURL(data[x].url)) {
        nasaImg.attr('src', data[x].url);
        break;
      }
    }
    //** account for images with too large of a width
    if (data[0].copyright) author = data[0].copyright;
    description = data[0].explanation;
  }

  // make sure image is not a video
  function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  // NYT Articles
  function getNytInfo() {
    $.get( nytArticles )
    .done( setArticles )
    .fail( err => console.log(err) )
  }

  // display nyt data
  function setArticles(data) {
    console.log(data.results);
    data.results.map( result => {
      if (result.section === 'World') {
        let content = `
          <div class='world-news articles'>
            <div class="news-img" style="background-image: url('${result.multimedia[4].url}')"></div>
            <h2>${result.title}</h2>
            <p><a href="${result.short_url}">Click Here</a> for more information.</p>
          </div>`;
        $('#nytimes-container').append(content);
      }
    });
  }
})