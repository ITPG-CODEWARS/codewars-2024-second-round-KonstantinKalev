document.addEventListener("DOMContentLoaded", function() {
    let textElement = document.getElementById('text');
    let originalText = "Вашият линк се генерира.";
    let count = 0;

    setInterval(function() {
        count = (count + 1) % 3;
        let dots = ".".repeat(count);
        textElement.innerText = `${originalText}${dots}`;
    }, 500);

    setTimeout(function() {
        window.location.href = 'index.html';
    }, 3000);
});