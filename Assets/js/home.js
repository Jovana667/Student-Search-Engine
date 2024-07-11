// connect to the search.html 

const searchFormEl = document.querySelector('#search-form');

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
}


searchFormEl.addEventListener('submit', handleSearchFormSubmit);
