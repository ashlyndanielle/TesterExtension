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
  let newsSelection = 'World';
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
  // FIX: account for cases when newsSelection is empty
  function setArticles(data) {
    $('#nytimes-container').empty();
    console.log(data.results);
    data.results.map( result => {
      // console.log(result.section);
      // console.log(result.length);
      if (result.section === newsSelection) {
        let content = `
          <div class='articles'>
            <div class="news-img" style="background-image: url('${result.multimedia[4] ? result.multimedia[4].url : '../images/default-image.png'}')"></div>
            <p class="title">${result.title}</p>
            <p><a href="${result.short_url}">More Info</a></p>
          </div>`;
        $('#nytimes-container').append(content);
      }
    });
  }

  // change new articles
  $('#news-selector').on('change', () => {
    console.log( $('#news-selector').val() )
    newsSelection = $('#news-selector').val()
    getNytInfo();
  });

  const selectors = $('.news-selectors label');
  selectors.on('click', function() {
    newsSelection = $(this).context.innerHTML;
    getNytInfo();
  })

})