const searchFormEl = document.querySelector('#search-form');
const searchHistoryContainer = document.querySelector('#search-history');
const deleteModal = document.querySelector('#delete-modal');
const closeModalBtn = document.querySelector('#close-modal');
const confirmDeleteBtn = document.querySelector('#confirm-delete');
const cancelDeleteBtn = document.querySelector('#cancel-delete');
const showHistoryBtn = document.querySelector('#show-history');

let searchHistoryList = JSON.parse(localStorage.getItem('search-history-list')) || [];
let currentDeleteIndex = null;
let isHistoryVisible = false;

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
    if (searchHistoryList.length > 10) {
      searchHistoryList = searchHistoryList.slice(-10);
    }
    localStorage.setItem('search-history-list', JSON.stringify(searchHistoryList));
  }

  const queryString = `https://jovana667.github.io/Student-Search-Engine/search.html?q=${searchInputVal}&source=${selectedSource}`;
  // const queryString = `./search.html?q=${searchInputVal}&source=${selectedSource}`;

  location.assign(queryString);
}

function renderSearchHistoryList() {
  searchHistoryContainer.innerHTML = '';

  searchHistoryList.slice(-10).reverse().forEach((searchHistory, index) => {
    const historyButton = document.createElement('button');
    historyButton.classList.add('btn', 'btn-info', 'btn-block', 'mb-2', 'd-flex', 'align-items-center', 'justify-content-between');
    historyButton.innerHTML = `${searchHistory.query} (${searchHistory.source})`;

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash', 'text-danger', 'ms-2');
    deleteIcon.addEventListener('click', (event) => {
      event.stopPropagation(); 
      currentDeleteIndex = searchHistoryList.length - 1 - index;
      openModal();
    });

    historyButton.appendChild(deleteIcon);

    historyButton.addEventListener('click', () => {
      const searchQuery = searchHistory.query;
      const searchSource = searchHistory.source;
      const queryString = `./search.html?q=${searchQuery}&source=${searchSource}`;
      location.assign(queryString);

      searchHistoryList = searchHistoryList.filter(
        history => !(history.query === searchHistory.query && history.source === searchHistory.source)
      );

      searchHistoryList.push(searchHistory);
      if (searchHistoryList.length > 10) {
        searchHistoryList = searchHistoryList.slice(-10);
      }
      localStorage.setItem('search-history-list', JSON.stringify(searchHistoryList));
      renderSearchHistoryList();
    });

    searchHistoryContainer.appendChild(historyButton);
  });
}

function openModal() {
  deleteModal.classList.add('is-active');
}

function closeModal() {
  deleteModal.classList.remove('is-active');
}

function toggleSearchHistory(event) {
  event.preventDefault(); // Prevent form submission
  isHistoryVisible = !isHistoryVisible;
  searchHistoryContainer.style.display = isHistoryVisible ? 'block' : 'none';
  showHistoryBtn.textContent = isHistoryVisible ? 'Hide' : 'Show';
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

closeModalBtn.addEventListener('click', closeModal);
cancelDeleteBtn.addEventListener('click', closeModal);
confirmDeleteBtn.addEventListener('click', () => {
  if (currentDeleteIndex !== null) {
    searchHistoryList.splice(currentDeleteIndex, 1);
    localStorage.setItem('search-history-list', JSON.stringify(searchHistoryList));
    renderSearchHistoryList();
    currentDeleteIndex = null;
  }
  closeModal();
});

showHistoryBtn.addEventListener('click', toggleSearchHistory);

window.addEventListener('load', () => {
  const storedHistory = localStorage.getItem('search-history-list');
  if (storedHistory) {
    searchHistoryList = JSON.parse(storedHistory);
    renderSearchHistoryList();
  }
  searchHistoryContainer.style.display = 'Show';
});

window.addEventListener('click', (event) => {
  if (event.target === deleteModal) {
    closeModal();
  }
});
