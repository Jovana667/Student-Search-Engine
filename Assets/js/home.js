// updated the connecting to the search.html and added search history

const searchFormEl = document.querySelector('#search-form');
const searchHistoryEl = document.querySelector('#search-history');

let searchHistoryList = JSON.parse(localStorage.getItem('search-history-list')) || [];

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = document.querySelector('#search-input').value;
  const youtubeRadio = document.querySelector('#radioYouTube');
  const wikipediaRadio = document.querySelector('#radioWikipedia');

  if (!searchInputVal) {
    alert('You need a search input value!'); //can change this to a warning dialog model to meet the grading criteria or just simply add a <p> element
    return;
  }

  let selectedSource;
  if (youtubeRadio.checked) {
    selectedSource = youtubeRadio.value;
  } else if (wikipediaRadio.checked) {
    selectedSource = wikipediaRadio.value;
  } else {
    alert('Please choose a source website that you want to search from!'); 
    return;
  }

  const searchEntry = { query: searchInputVal, source: selectedSource };
  const isDuplicate = searchHistoryList.some(
    history => history.query === searchEntry.query && history.source === searchEntry.source
  );

  if (!isDuplicate) {
    searchHistoryList.push(searchEntry);
    localStorage.setItem('search-history-list', JSON.stringify(searchHistoryList));
  }

  const queryString = `./search.html?q=${searchInputVal}&source=${selectedSource}`;

  location.assign(queryString);
}

function renderSearchHistoryList() {
  searchHistoryEl.innerHTML = ''; 

  searchHistoryList.forEach(searchHistory => {
    const historyButton = document.createElement('button');
    historyButton.textContent = `${searchHistory.query} (${searchHistory.source})`;
    historyButton.classList.add('btn', 'btn-info', 'btn-block', 'mb-2');
    historyButton.addEventListener('click', () => {
      document.querySelector('#search-input').value = searchHistory.query;
      if (searchHistory.source === 'youtube') {
        document.querySelector('#radioYouTube').checked = true;
      } else if (searchHistory.source === 'wikipedia') {
        document.querySelector('#radioWikipedia').checked = true;
      }
    });
    searchHistoryEl.appendChild(historyButton);
  });
};

renderSearchHistoryList();

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
