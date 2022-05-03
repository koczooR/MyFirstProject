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

let house1ExitMap = [];
for (let i = 0; i < exitActivationArray.length; i += 40) {
  house1ExitMap.push(exitActivationArray.slice(i, i + 40));
}

const house1ExitElements = [];
house1ExitMap.forEach((row, i) => {
  row.forEach((element, j) => {
    if (element === 770) {
      house1ExitElements.push(
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

let gulpMap = [];
for (let i = 0; i < gulpArray.length; i += 40) {
  gulpMap.push(gulpArray.slice(i, i + 40));
}

const gulpElements = [];
gulpMap.forEach((row, i) => {
  row.forEach((element, j) => {
    if (element === 770) {
      gulpElements.push(
        new Border({
          position: {
            x: j * 88 + canvas.width / 2 - mapWidth / 2 + 100,
            y: i * 88 + canvas.height / 2 - mapHeight / 2 - 132,
          },
        })
      );
    }
  });
});

let hicksMap = [];
for (let i = 0; i < hicksArray.length; i += 40) {
  hicksMap.push(hicksArray.slice(i, i + 40));
}

const hicksElements = [];
hicksMap.forEach((row, i) => {
  row.forEach((element, j) => {
    if (element === 770) {
      hicksElements.push(
        new Border({
          position: {
            x: j * 88 + canvas.width / 2 - mapWidth / 2 + 252,
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
  interact: {
    pressed: false,
  },
};

const movables = [
  background,
  ...house1BorderElements,
  foreground,
  ...house1ExitElements,
  ...gulpElements,
  ...hicksElements,
];

function isColliding({ value1, value2 }) {
  return (
    value1.position.x + spriteWidth >= value2.position.x &&
    value1.position.x <= value2.position.x + 88 &&
    value1.position.y + spriteHeight >= value2.position.y &&
    value1.position.y <= value2.position.y + 88
  );
}

const container = document.querySelector(".container");
const infoBox = document.querySelector(".info_box");
const gulpTag = document.querySelector(".gulp");
const hicksTag = document.querySelector(".hicks");

const textInfo = "To interact press 'E' button.";

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();
  player.playerDraw();
  foreground.draw();
  house1BorderElements.forEach((el) => {
    el.draw();
  });
  house1ExitElements.forEach((el) => {
    el.draw();
  });
  gulpElements.forEach((el) => {
    el.draw();
  });
  hicksElements.forEach((el) => {
    el.draw();
  });

  framesDrawn++;
  if (framesDrawn >= 10) {
    currentFrame++;
    framesDrawn = 0;
  }

  let hideText = true;
  for (let i = 0; i < gulpElements.length; i++) {
    const gulp = gulpElements[i];

    if (
      isColliding({
        value1: player,
        value2: {
          position: {
            x: gulp.position.x,
            y: gulp.position.y,
          },
        },
      })
    ) {
      hideText = false;
      infoBox.style.display = "block";
      infoBox.innerText = textInfo;
    }
    if (
      isColliding({
        value1: player,
        value2: {
          position: {
            x: gulp.position.x,
            y: gulp.position.y,
          },
        },
      }) &&
      keys.interact.pressed
    ) {
      hideText = false;
      gulpTag.style.display = "block";
      setTimeout(function () {
        gulpTag.style.display = "none";
      }, 1000);
    }
  }
  if (hideText) {
    infoBox.style.display = "none";
  }

  for (let i = 0; i < hicksElements.length; i++) {
    const hicks = hicksElements[i];

    if (
      isColliding({
        value1: player,
        value2: {
          position: {
            x: hicks.position.x,
            y: hicks.position.y,
          },
        },
      })
    ) {
      hideText = false;
      infoBox.style.display = "block";
      infoBox.innerText = textInfo;
    }
    if (
      isColliding({
        value1: player,
        value2: {
          position: {
            x: hicks.position.x,
            y: hicks.position.y,
          },
        },
      }) &&
      keys.interact.pressed
    ) {
      hideText = false;
      hicksTag.style.display = "block";
      setTimeout(function () {
        hicksTag.style.display = "none";
      }, 1000);
    }
  }
  if (hideText) {
    infoBox.style.display = "none";
  }

  for (let i = 0; i < house1ExitElements.length; i++) {
    const house1ExitActivation = house1ExitElements[i];

    if (
      isColliding({
        value1: player,
        value2: {
          position: {
            x: house1ExitActivation.position.x,
            y: house1ExitActivation.position.y,
          },
        },
      })
    ) {
      container.style.transition = "1s";
      container.style.opacity = "0";
      setTimeout(function () {
        window.location.href = "main.html";
      }, 500);
    }
    break;
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
    case "e":
      keys.interact.pressed = true;
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
    case "e":
      keys.interact.pressed = false;
      break;
  }
});
