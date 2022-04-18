const btn = document.querySelector(".btn");
const container = document.querySelector(".container");
const buttonAudio = new Audio("Assets/Music/pika.mp3");
buttonAudio.volume = 0.05;

btn.addEventListener("click", function(event) {
    event.preventDefault();
    setTimeout(function() {
        window.location.href = "main.html";
    }, 500);
    container.style.transition = "1s";
    container.style.opacity = "0";
    buttonAudio.play();
});