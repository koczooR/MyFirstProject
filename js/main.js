const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const image = new Image();
image.src = "img/myProjectMap.png";

const playerDown = new Image();
playerDown.src = "Assets/Character Assets/playerDown.png";

const playerUp = new Image();
playerUp.src = "Assets/Character Assets/playerUp.png";

const playerLeft = new Image();
playerLeft.src = "Assets/Character Assets/playerLeft.png";

const playerRight = new Image();
playerRight.src = "Assets/Character Assets/playerRight.png";

const foregroundImg = new Image();
foregroundImg.src = "img/Foreground.png";

const foreground2Img = new Image();
foreground2Img.src = "img/Foreground2.png";

const columns = 4;
const totalFrames = 4;
let currentFrame = 0;
let srcX = 0;
let srcY = 0;
const spriteWidth = 192 / columns;
const spriteHeight = 68;
let framesDrawn = 0;
const mapWidth = 4620;
const mapHeight = 2640;

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

class Border {
  constructor({ position }) {
    this.position = position;
  }
  draw() {
    ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
    ctx.fillRect(this.position.x, this.position.y, 66, 66);
  }
}

let borderMap = [];
for (let i = 0; i < collisionsArray.length; i += 70) {
  borderMap.push(collisionsArray.slice(i, i + 70));
}

const borderElements = [];

borderMap.forEach((row, i) => {
  row.forEach((element, j) => {
    if (element === 1025) {
      borderElements.push(
        new Border({
          position: {
            x: j * 66 + canvas.width / 2 - mapWidth / 2 + 66,
            y: i * 66 + canvas.height / 2 - mapHeight / 2,
          },
        })
      );
    }
  });
});

console.log(borderElements);

const background = new Sprite({
  position: {
    x: canvas.width / 2 - mapWidth / 2 + 66,
    y: canvas.height / 2 - mapHeight / 2,
  },
  image: image,
});

const player = new Sprite({
  position: {
    x: canvas.width / 2 - spriteWidth / 2,
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
    x: canvas.width / 2 - mapWidth / 2 + 66,
    y: canvas.height / 2 - mapHeight / 2,
  },
  image: foregroundImg,
});

const foreground2 = new Sprite({
  position: {
    x: canvas.width / 2 - mapWidth / 2 + 66,
    y: canvas.height / 2 - mapHeight / 2,
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
  borderElements.forEach((el) => {
    el.draw();
  });

  framesDrawn++;
  if (framesDrawn >= 15) {
    currentFrame++;
    framesDrawn = 0;
  }

  if (keys.w.pressed && lastKey === "w") {
    background.position.y += 2;
    foreground.position.y += 2;
    foreground2.position.y += 2;
    borderElements.forEach((el) => {
      el.position.y += 2;
    });
    player.image = player.sprites.up;
    player.playerMovement();
  }
  if (keys.s.pressed && lastKey === "s") {
    background.position.y -= 2;
    foreground.position.y -= 2;
    foreground2.position.y -= 2;
    borderElements.forEach((el) => {
      el.position.y -= 2;
    });
    player.image = player.sprites.down;
    player.playerMovement();
  }
  if (keys.a.pressed && lastKey === "a") {
    background.position.x += 2;
    foreground.position.x += 2;
    foreground2.position.x += 2;
    borderElements.forEach((el) => {
      el.position.x += 2;
    });
    player.image = player.sprites.left;
    player.playerMovement();
  }
  if (keys.d.pressed && lastKey === "d") {
    background.position.x -= 2;
    foreground.position.x -= 2;
    foreground2.position.x -= 2;
    borderElements.forEach((el) => {
      el.position.x -= 2;
    });
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

window.addEventListener("click", () => {
  audio.play();
});