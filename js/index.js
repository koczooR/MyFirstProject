const btn = document.querySelector(".btn");
const container = document.querySelector(".container");

btn.addEventListener("click", function(event) {
    event.preventDefault();
    setTimeout(function() {
        window.location.href = "/main.html";
    }, 500);
    container.style.transition = "1s";
    container.style.opacity = "0";
});