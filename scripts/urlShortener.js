const inputBox = document.getElementById('originalURL');
const shortUrlsContainer = document.getElementById('short-urls-container');

function shortenURL(){
    if (inputBox.value === ''){
        alert("Трябва да въведете линк!");
    }
    else{
        let shortUrlDiv = document.createElement("div");
        shortUrlDiv.className = "shortUrlDiv";
        let urlDisplay = document.createElement("p");
        urlDisplay.innerHTML = inputBox.value;

        shortUrlDiv.appendChild(urlDisplay);
        shortUrlsContainer.appendChild(shortUrlDiv);
    }
    inputBox.value = "";
}