document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let query = document.getElementById('search-query').value;
    searchWikipedia(query);
});

function searchWikipedia(query) {
    let apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&utf8=&format=json&origin=*`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let articlesContainer = document.getElementById('articles');
            articlesContainer.innerHTML = '';
            data.query.search.forEach(item => {
                let articleDiv = document.createElement('div');
                articleDiv.classList.add('article');

                let title = document.createElement('h3');
                title.textContent = item.title;
                articleDiv.appendChild(title);

                let snippet = document.createElement('p');
                snippet.innerHTML = item.snippet + '...'; // Using innerHTML to render the HTML entities correctly
                articleDiv.appendChild(snippet);

                let readMoreLink = document.createElement('a');
                readMoreLink.href = `https://en.wikipedia.org/?curid=${item.pageid}`;
                readMoreLink.textContent = 'Read more';
                readMoreLink.target = '_blank'; // Opens link in a new tab
                articleDiv.appendChild(readMoreLink);

                articlesContainer.appendChild(articleDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}