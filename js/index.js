const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const image = new Image();
image.src = "../img/myProjectMap.png";
image.onload = () => {
    ctx.drawImage(image, -1300, -900);
}