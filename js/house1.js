const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = 4;
const totalFrames = 4;
let currentFrame = 0;
let srcX = 0;
let srcY = 0;
const spriteWidth = 192 / columns;
const spriteHeight = 68;
let framesDrawn = 0;
const mapWidth = 3520;
const mapHeight = 3564;

const image = new Image();
image.src = "img/house1_550.png";

const playerDown = new Image();
playerDown.src = "Assets/Character Assets/playerDown.png";

const playerUp = new Image();
playerUp.src = "Assets/Character Assets/playerUp.png";

const playerLeft = new Image();
playerLeft.src = "Assets/Character Assets/playerLeft.png";

const playerRight = new Image();
playerRight.src = "Assets/Character Assets/playerRight.png";

const foregroundImg = new Image();
foregroundImg.src = "img/house1Foreground.png";

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
    ctx.fillStyle = "rgba(255, 0, 0, 0)";
    ctx.fillRect(this.position.x, this.position.y, 88, 88);
  }
}

let house1BorderMap = [];
for (let i = 0; i < house1CollisionsArray.length; i += 40) {
  house1BorderMap.push(house1CollisionsArray.slice(i, i + 40));
}

const house1BorderElements = [];
house1BorderMap.forEach((row, i) => {
  row.forEach((element, j) => {
    if (element === 770) {
      house1BorderElements.push(
        new Border({
          position: {
            x: j * 88 + canvas.width / 2 - mapWidth / 2 + 176,
            y: i * 88 + canvas.height / 2 - mapHeight / 2 - 132,
          },
        })
      );
    }
  });
});

const background = new Sprite({
  position: {
    x: canvas.width / 2 - mapWidth / 2 + 176,
    y: canvas.height / 2 - mapHeight / 2 - 132,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: canvas.width / 2 - mapWidth / 2 + 176,
    y: canvas.height / 2 - mapHeight / 2 - 132,
  },
  image: foregroundImg,
});

const player = new Sprite({
  position: {
    x: canvas.width / 2 - spriteWidth / 2,
    y: canvas.height / 2,
  },
  image: playerUp,
  sprites: {
    up: playerUp,
    down: playerDown,
    left: playerLeft,
    right: playerRight,
  },
});

const keys = {
  up: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

const movables = [background, ...house1BorderElements, foreground];

function isColliding({ value1, value2 }) {
  return (
    value1.position.x + spriteWidth >= value2.position.x &&
    value1.position.x <= value2.position.x + 88 &&
    value1.position.y + spriteHeight >= value2.position.y &&
    value1.position.y <= value2.position.y + 88
  );
}

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();
  player.playerDraw();
  foreground.draw();
  house1BorderElements.forEach((el) => {
    el.draw();
  });

  framesDrawn++;
  if (framesDrawn >= 10) {
    currentFrame++;
    framesDrawn = 0;
  }

  let moving = true;
  if (keys.up.pressed && lastKey === "up") {
    player.image = player.sprites.up;
    player.playerMovement();

    for (let i = 0; i < house1BorderElements.length; i++) {
      const border = house1BorderElements[i];

      if (
        isColliding({
          value1: player,
          value2: {
            position: { x: border.position.x, y: border.position.y + 3 },
          },
        })
      ) {
        moving = false;
      }
    }
    if (moving) {
      movables.forEach((el) => {
        el.position.y += 3;
      });
    }
  }
  if (keys.down.pressed && lastKey === "down") {
    player.image = player.sprites.down;
    player.playerMovement();

    for (let i = 0; i < house1BorderElements.length; i++) {
      const border = house1BorderElements[i];

      if (
        isColliding({
          value1: player,
          value2: {
            position: { x: border.position.x, y: border.position.y - 3 },
          },
        })
      ) {
        moving = false;
      }
    }
    if (moving) {
      movables.forEach((el) => {
        el.position.y -= 3;
      });
    }
  }
  if (keys.left.pressed && lastKey === "left") {
    player.image = player.sprites.left;
    player.playerMovement();

    for (let i = 0; i < house1BorderElements.length; i++) {
      const border = house1BorderElements[i];

      if (
        isColliding({
          value1: player,
          value2: {
            position: { x: border.position.x + 3, y: border.position.y },
          },
        })
      ) {
        moving = false;
      }
    }
    if (moving) {
      movables.forEach((el) => {
        el.position.x += 3;
      });
    }
  }
  if (keys.right.pressed && lastKey === "right") {
    player.image = player.sprites.right;
    player.playerMovement();

    for (let i = 0; i < house1BorderElements.length; i++) {
      const border = house1BorderElements[i];

      if (
        isColliding({
          value1: player,
          value2: {
            position: { x: border.position.x - 3, y: border.position.y },
          },
        })
      ) {
        moving = false;
      }
    }
    if (moving) {
      movables.forEach((el) => {
        el.position.x -= 3;
      });
    }
  }
}
animate();

let lastKey = "";

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.up.pressed = true;
      lastKey = "up";
      break;
    case "s":
      keys.down.pressed = true;
      lastKey = "down";
      break;
    case "a":
      keys.left.pressed = true;
      lastKey = "left";
      break;
    case "d":
      keys.right.pressed = true;
      lastKey = "right";
      break;
    case "ArrowUp":
      keys.up.pressed = true;
      lastKey = "up";
      break;
    case "ArrowDown":
      keys.down.pressed = true;
      lastKey = "down";
      break;
    case "ArrowLeft":
      keys.left.pressed = true;
      lastKey = "left";
      break;
    case "ArrowRight":
      keys.right.pressed = true;
      lastKey = "right";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.up.pressed = false;
      break;
    case "s":
      keys.down.pressed = false;
      break;
    case "a":
      keys.left.pressed = false;
      break;
    case "d":
      keys.right.pressed = false;
      break;
    case "ArrowUp":
      keys.up.pressed = false;
      break;
    case "ArrowDown":
      keys.down.pressed = false;
      break;
    case "ArrowLeft":
      keys.left.pressed = false;
      break;
    case "ArrowRight":
      keys.right.pressed = false;
      break;
  }
});
