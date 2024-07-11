
// I have updated the content of handleSearchFormSubmit function and getParams function
// 
// Add searchWikipediaApi and searchYoutubeApi function, but haven't edit the inside of the function, 
// not sure should we put them into different functions or just use one searchApi for both Wikipedia and Youtube
// 
// searchApi and printResults functions are still same from mini project, haven't edit anything within them

const resultTextEl = document.querySelector('#result-text');
const resultContentEl = document.querySelector('#result-content');
const searchFormEl = document.querySelector('#search-form');

function getParams() {
  const searchParamsArr = document.location.search.split('&');

  const query = searchParamsArr[0].split('=').pop();
  const source = searchParamsArr[1].split('=').pop();

  if (source === wikipedia) {
    searchWikipediaApi(query)
  } else {
    searchYoutubeApi(query)
  }

}

function searchWikipediaApi(query) {

}

function searchYoutubeApi(query) {
  
}

function searchApi(query, format) {
  let locQueryUrl = 'https://www.loc.gov/search/?fo=json';

  if (format) {
    locQueryUrl = `https://www.loc.gov/${format}/?fo=json`;
  }

  locQueryUrl = `${locQueryUrl}&q=${query}`;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      resultTextEl.textContent = locRes.search.query;

      console.log(locRes);

      if (!locRes.results.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (let i = 0; i < locRes.results.length; i++) {
          printResults(locRes.results[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  const resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  const resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  const titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  const bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    `<strong>Date:</strong>${resultObj.date}<br/>`;

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      `<strong>Subjects:</strong>${resultObj.subject.join(', ')}<br/>`;
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      `<strong>Description:</strong>${resultObj.description[0]}`;
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  const linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = document.querySelector('#search-input').value;
  //   const sourceInputVal = document.querySelector('#source-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!'); //can change this to a warning dialog model or just simply add a <p> element
    return;
  }

  //   if (!sourceInputVal) {
  //     console.error('Please choose a source website that you want to search from!'); 
  //     return;
  //   }

  const queryString = `./search.html?q=${searchInputVal}`; // $source=${sourceInputVal}

  location.assign(queryString);

  getParams();
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();