const inputBox = document.getElementById('originalURL');
const shortUrlsContainer = document.getElementById('short-urls-container');
const generatedShortUrls = new Set();

function shortenURL() {
    if (inputBox.value === '') {
        alert("Трябва да въведете линк!");
    } else {
        const length = getSelectedLength();
        let shortKey;
        do {
            shortKey = generateShortURL(length);
        } while (generatedShortUrls.has(shortKey));

        generatedShortUrls.add(shortKey);

        const domain = new URL(inputBox.value).hostname;
        const shortUrl = `${domain}/${shortKey}`;
        
        displayShortUrl(shortUrl);
        saveUrl(inputBox.value, shortUrl);
    }
    inputBox.value = "";
}

function getSelectedLength() {
    const radios = document.getElementsByName('length');
    for (const radio of radios) {
        if (radio.checked) {
            return parseInt(radio.value);
        }
    }
}

function generateShortURL(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

function displayShortUrl(shortUrl) {
    let shortUrlDiv = document.createElement("div");
    shortUrlDiv.className = "shortUrlDiv";
    
    let urlDisplay = document.createElement("a");
    urlDisplay.innerHTML = shortUrl;

    let btnsDiv = document.createElement("div");
    btnsDiv.className = "btnsDiv";

    let deleteBtn = document.createElement("img");
    deleteBtn.src = "../images/bin.png";

    let settingsBtn = document.createElement("img");
    settingsBtn.src = "../images/gear.png";

    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    const originalUrl = urls.find(url => url.shortUrl === shortUrl)?.originalUrl;

    if (originalUrl) {
        urlDisplay.href = originalUrl;
        urlDisplay.target = "_blank";
    }

    shortUrlDiv.appendChild(urlDisplay);
    shortUrlDiv.appendChild(btnsDiv);
    btnsDiv.appendChild(deleteBtn);
    btnsDiv.appendChild(settingsBtn);
    shortUrlsContainer.appendChild(shortUrlDiv);
}

function saveUrl(originalUrl, shortUrl) {
    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    urls.push({ originalUrl, shortUrl });
    localStorage.setItem('urls', JSON.stringify(urls));
}

function showStoredUrls() {
    const urls = JSON.parse(localStorage.getItem('urls')) || [];

    urls.forEach(url => {
        displayShortUrl(url.shortUrl);
    });
}

window.onload = showStoredUrls;