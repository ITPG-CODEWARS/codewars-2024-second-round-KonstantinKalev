document.addEventListener("DOMContentLoaded", function() {
    let textElement = document.getElementById('text');
    let originalText = "Персонализираното Ви<br>съкращение се прилага.";
    let count = 0;

    setInterval(function() {
        count = (count + 1) % 3;
        let dots = ".".repeat(count);
        textElement.innerHTML = `${originalText}${dots}`;
    }, 500);

    setTimeout(function() {
        window.location.href = 'index.html';
    }, 3000);
});