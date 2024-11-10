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

        setTimeout(() => {
            window.location.href = 'generating.html';
        });
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
    const urlData = urls.find(url => url.shortUrl === shortUrl);

    if (urlData) {
        urlDisplay.href = urlData.originalUrl;
        urlDisplay.target = "_blank";
        urlDisplay.addEventListener('click', function(event) {
            if (urlData.clicks > 0) {
                urlData.clicks -= 1;
                localStorage.setItem('urls', JSON.stringify(urls));
                if (urlData.clicks === 0) {
                    const updatedUrls = urls.filter(url => url.shortUrl !== shortUrl);
                    localStorage.setItem('urls', JSON.stringify(updatedUrls));
                    alert(`Линкът "${shortUrl}" ще бъде изтрит, тъй като броят на натисканията свърши.`);
                    shortUrlDiv.remove();
                    showStoredUrls();
                }
            }
        });
    }

    deleteBtn.addEventListener('click', function() {
        const updatedUrls = urls.filter(url => url.shortUrl !== shortUrl);
        localStorage.setItem('urls', JSON.stringify(updatedUrls));

        shortUrlDiv.remove();
        showStoredUrls();
    });

    settingsBtn.addEventListener('click', function() {
        window.location.href = `advancedView.html?shortUrl=${encodeURIComponent(shortUrl)}`;
    });

    shortUrlDiv.appendChild(urlDisplay);
    shortUrlDiv.appendChild(btnsDiv);
    btnsDiv.appendChild(deleteBtn);
    btnsDiv.appendChild(settingsBtn);
    shortUrlsContainer.appendChild(shortUrlDiv);
}

function saveUrl(originalUrl, shortUrl) {
    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    urls.push({ originalUrl, shortUrl, clicks: null });
    localStorage.setItem('urls', JSON.stringify(urls));
}

function showStoredUrls() {
    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    shortUrlsContainer.innerHTML = '';

    const title = document.createElement("h1");
    title.className = "short-urls-title";
    title.innerHTML = "Съкратени URL адреси:";
    shortUrlsContainer.appendChild(title);

    urls.forEach(url => {
        displayShortUrl(url.shortUrl);
    });
}

window.onload = showStoredUrls;