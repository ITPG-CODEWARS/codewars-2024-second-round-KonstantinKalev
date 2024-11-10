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
        a.download = `QRCode - ${sanitizedUrl}.png`;
        a.click();
    } else {
        alert("QR кодът не е генериран.");
    }
}

document.getElementById('downloadBtn').addEventListener('click', downloadQRCode);
window.onload = loadUrls;