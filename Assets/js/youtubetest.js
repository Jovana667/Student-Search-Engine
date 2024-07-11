document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let query = document.getElementById('search-query').value;
    searchYouTube(query);
});

function searchYouTube(query) {
    let apiKey = 'AIzaSyBgjhM8jkAtnDveHMpE2IY0O5MGTioGeMs';
    let apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let videosContainer = document.getElementById('videos');
            videosContainer.innerHTML = '';
            data.items.forEach(item => {
                let videoId = item.id.videoId;
                let iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                videosContainer.appendChild(iframe);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
