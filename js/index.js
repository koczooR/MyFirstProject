const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

const image = new Image();
image.src = "../img/myProjectMap.png";

const foregroundImg = new Image();
foregroundImg.src = "../img/Foreground.png";

const foreground2Img = new Image();
foreground2Img.src = "../img/Foreground2.png";

const playerDown = new Image();
playerDown.src = "../Assets/Character Assets/playerDown.png";

const playerUp = new Image();
playerUp.src = "../Assets/Character Assets/playerUp.png";

const playerLeft = new Image();
playerLeft.src = "../Assets/Character Assets/playerLeft.png";

const playerRight = new Image();
playerRight.src = "../Assets/Character Assets/playerRight.png";

class Sprite {
  constructor({ position, image, sprites }) {
    this.position = position;
    this.image = image;
    this.sprites = sprites;
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
  playerDraw() {
    ctx.drawImage(
      this.image,
      srcX,
      srcY,
      spriteWidth,
      spriteHeight,
      this.position.x,
      this.position.y,
      spriteWidth,
      spriteHeight
    );
  }
  playerMovement() {
    currentFrame = currentFrame % totalFrames;
    srcX = currentFrame * spriteWidth;
  }
}

const columns = 4;
const totalFrames = 4;
let currentFrame = 0;
let srcX = 0;
let srcY = 0;
const spriteWidth = playerDown.width / columns;
const spriteHeight = playerDown.height;
let framesDrawn = 0;

const background = new Sprite({
  position: {
    x: -1359,
    y: -860,
  },
  image: image,
});

const player = new Sprite({
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
  image: playerDown,
  sprites: {
    up: playerUp,
    down: playerDown,
    left: playerLeft,
    right: playerRight,
  },
});

const foreground = new Sprite({
  position: {
    x: -1359,
    y: -860,
  },
  image: foregroundImg,
});

const foreground2 = new Sprite({
  position: {
    x: -1359,
    y: -860,
  },
  image: foreground2Img,
});

const keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();
  player.playerDraw();
  foreground2.draw();
  foreground.draw();

  framesDrawn++;
  if (framesDrawn >= 15) {
    currentFrame++;
    framesDrawn = 0;
  }

  if (keys.w.pressed && lastKey === "w") {
    background.position.y += 2;
    foreground.position.y += 2;
    foreground2.position.y += 2;
    player.image = player.sprites.up;
    player.playerMovement();
  }
  if (keys.s.pressed && lastKey === "s") {
    background.position.y -= 2;
    foreground.position.y -= 2;
    foreground2.position.y -= 2;
    player.image = player.sprites.down;
    player.playerMovement();
  }
  if (keys.a.pressed && lastKey === "a") {
    background.position.x += 2;
    foreground.position.x += 2;
    foreground2.position.x += 2;
    player.image = player.sprites.left;
    player.playerMovement();
  }
  if (keys.d.pressed && lastKey === "d") {
    background.position.x -= 2;
    foreground.position.x -= 2;
    foreground2.position.x -= 2;
    player.image = player.sprites.right;
    player.playerMovement();
  }
}
animate();

let lastKey = "";

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

const audio = document.querySelector("audio");
audio.volume = 0.05;
