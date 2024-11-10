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
        generateQRCode(urlData.originalUrl);

        if (urlData.clicks !== null && urlData.clicks !== undefined) {
            document.getElementById('clickedTimesLeft').innerText = `${urlData.clicks} натискания`;
        } else {
            document.getElementById('clickedTimesLeft').innerText = "николко натискания";
        }        

    } else {
        alert("Съкратеният URL не е намерен.");
    }
}

function generateQRCode(url) {
    const qrCodeContainer = document.getElementById('qrcode');
    qrCodeContainer.innerHTML = "";
    new QRCode(qrCodeContainer, {
        text: url,
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function downloadQRCode() {
    const canvas = document.querySelector('#qrcode canvas');
    const shortUrl = getQueryParams();
    
    if (canvas && shortUrl) {
        const imgData = canvas.toDataURL('image/png');
        let sanitizedUrl = shortUrl.replace(/[^a-zA-Z0-9]/g, '-');
        const a = document.createElement('a');
        a.href = imgData;
        a.download = `QRCode-${sanitizedUrl}.png`;
        a.click();
    }
}

function validateCustomURL(input) {
    const regex = /^[a-z0-9]{5,10}$/;
    return regex.test(input);
}

function updateShortUrl(newShortUrl) {
    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    const shortUrl = getQueryParams();
    const urlData = urls.find(url => url.shortUrl === shortUrl);
    
    if (urlData) {
        const newShortUrlPart = newShortUrl.trim();
        const isDuplicate = urls.some(url => {
            const existingShortUrlPart = url.shortUrl.split('/').pop();
            return existingShortUrlPart === newShortUrlPart && url.shortUrl !== shortUrl;
        });

        if (isDuplicate) {
            alert("Това съкращение е заето. Моля, изберете друго.");
            return;
        }
        const currentShortUrlPart = shortUrl.split('/').pop();
        if (currentShortUrlPart === newShortUrlPart) {
            alert("Не можете да зададете същото съкращение.");
            return;
        }
        const domain = shortUrl.split('/')[0];
        const updatedShortUrl = `${domain}/${newShortUrlPart}`;
        urlData.shortUrl = updatedShortUrl;
        localStorage.setItem('urls', JSON.stringify(urls));
        window.location.href = 'changing.html';
    } else {
        alert("URL адресът не беше намерен.");
    }
}

document.getElementById('downloadBtn').addEventListener('click', downloadQRCode);

document.querySelector('.customBtn').addEventListener('click', function() {
    const customURLInput = document.getElementById('customURL').value.trim();

    if (validateCustomURL(customURLInput)) {
        updateShortUrl(customURLInput);
    } else {
        alert("Персонализираният URL адрес трябва да бъде от 5 до 10 символа и да съдържа само малки букви и цифри (a-z, 0-9).");
    }
});

function validateClicksInput() {
    const clicksInput = document.getElementById('clicksInput').value.trim();
    if (!clicksInput) {
        alert("Моля, въведете брой натискания.");
        return false;
    }

    const clicks = parseInt(clicksInput, 10);
    if (isNaN(clicks) || clicks < 0) {
        alert("Моля, въведете валиден брой натискания.");
        return false;
    }

    return clicks;
}

function updateClicksForUrl(clicks) {
    const shortUrl = getQueryParams();
    if (!shortUrl) {
        alert("Няма съкратен URL адрес.");
        return;
    }

    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    const urlData = urls.find(url => url.shortUrl === shortUrl);

    if (urlData) {
        urlData.clicks = clicks;
        localStorage.setItem('urls', JSON.stringify(urls));
        document.getElementById('clickedTimesLeft').innerText = `${clicks} натискания`;
        document.getElementById('clicksInput').value = '';
    } else {
        alert("Съкратеният URL не беше намерен.");
    }
}

document.querySelector('.autoDeleteBtn').addEventListener('click', function() {
    const clicks = validateClicksInput();
    if (clicks !== false) {
        updateClicksForUrl(clicks);
    }
});

document.querySelector('.resetBtn').addEventListener('click', function() {
    const shortUrl = getQueryParams();
    if (!shortUrl) {
        alert("Няма съкратен URL адрес.");
        return;
    }

    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    const urlData = urls.find(url => url.shortUrl === shortUrl);

    if (urlData) {
        urlData.clicks = null;
        localStorage.setItem('urls', JSON.stringify(urls));
        document.getElementById('clickedTimesLeft').innerText = "николко натискания";
        document.getElementById('clicksInput').value = '';
    }
});

window.onload = loadUrls;