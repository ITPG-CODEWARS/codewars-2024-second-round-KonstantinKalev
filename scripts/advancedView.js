function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const shortUrl = urlParams.get('shortUrl');
    return shortUrl;
}

function loadUrls() {
    const shortUrl = getQueryParams();
    if (!shortUrl) {
        alert("Няма съкратен URL адрес.");
        return;
    }

    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    const urlData = urls.find(url => url.shortUrl === shortUrl);

    if (urlData) {
        document.getElementById('original-url').innerText = urlData.originalUrl;
        document.getElementById('short-url').innerText = urlData.shortUrl;
    } else {
        alert("Съкратеният URL не е намерен.");
    }
}

window.onload = loadUrls;