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
                let pageId = item.pageid;
                let iframe = document.createElement('iframe');
                iframe.src = `https://en.wikipedia.org/?curid=${pageId}`;
                articlesContainer.appendChild(iframe);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
