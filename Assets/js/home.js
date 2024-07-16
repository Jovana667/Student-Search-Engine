const searchFormEl = document.querySelector('#search-form');
const searchHistoryEl = document.querySelector('#search-history');

let searchHistoryList = JSON.parse(localStorage.getItem('search-history-list')) || [];

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = document.querySelector('#search-input').value;
  const youtubeRadio = document.querySelector('#radioYouTube');
  const wikipediaRadio = document.querySelector('#radioWikipedia');

  if (!searchInputVal) {
    alert('You need a search input value!');
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

  searchHistoryList.forEach((searchHistory, index) => {
    const historyButton = document.createElement('button');
    historyButton.classList.add('btn', 'btn-info', 'btn-block', 'mb-2', 'd-flex', 'align-items-center', 'justify-content-between');
    historyButton.innerHTML = `${searchHistory.query} (${searchHistory.source})`;

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash', 'text-danger', 'ms-2');
    deleteIcon.addEventListener('click', (event) => {
      event.stopPropagation(); 
      searchHistoryList.splice(index, 1);
      localStorage.setItem('search-history-list', JSON.stringify(searchHistoryList));
      renderSearchHistoryList();
    });

    historyButton.appendChild(deleteIcon);

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
}

window.addEventListener('load', () => {
  const storedHistory = localStorage.getItem('search-history-list');
  if (storedHistory) {
    searchHistoryList = JSON.parse(storedHistory);
    renderSearchHistoryList();
  }
});

searchFormEl.addEventListener('submit', handleSearchFormSubmit);