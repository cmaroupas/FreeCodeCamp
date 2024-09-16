const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");
const checkpointMessage = document.querySelector(".checkpoint-screen > p");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 0.5;
let isCheckpointCollisionDetectionActive = true;

const proportionalSize = (size) => {
  return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
}

class Player {
    constructor() {
      this.position = {
        x: proportionalSize(10),
        y: proportionalSize(400),
      };
      this.velocity = {
        x: 0,
        y: 0,
      };
      this.width = proportionalSize(40);
      this.height = proportionalSize(40);
    }
    
    draw() {
      // Draw the player square
      ctx.fillStyle = "#e0e0e0";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      
      // Draw the smiley face
      const faceCenterX = this.position.x + this.width / 2;
      const faceCenterY = this.position.y + this.height / 2;
      const faceRadius = this.width / 2 - 5; // Slightly smaller than the square
      
      // Face outline
      ctx.beginPath();
      ctx.arc(faceCenterX, faceCenterY, faceRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffcc00"; // Yellow color
      ctx.fill();
      ctx.strokeStyle = "#000000"; // Black outline
      ctx.stroke();
      
      // Eyes
      const eyeRadius = faceRadius / 6;
      const leftEyeX = faceCenterX - faceRadius / 3;
      const rightEyeX = faceCenterX + faceRadius / 3;
      const eyeY = faceCenterY - faceRadius / 3;
      
      // Left eye
      ctx.beginPath();
      ctx.arc(leftEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#000000"; // Black color
      ctx.fill();
      
      // Right eye
      ctx.beginPath();
      ctx.arc(rightEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#000000"; // Black color
      ctx.fill();
      
      // Smile
      const smileRadius = faceRadius / 2;
      const smileY = faceCenterY + faceRadius / 4;
      ctx.beginPath();
      ctx.arc(faceCenterX, smileY, smileRadius, 0, Math.PI, false);
      ctx.strokeStyle = "#000000"; // Black color
      ctx.stroke();
    }
    
    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
  
      if (this.position.y + this.height + this.velocity.y <= canvas.height) {
        if (this.position.y < 0) {
          this.position.y = 0;
          this.velocity.y = gravity;
        }
        this.velocity.y += gravity;
      } else {
        this.velocity.y = 0;
      }
  
      if (this.position.x < this.width) {
        this.position.x = this.width;
      }
  
      if (this.position.x >= canvas.width - this.width * 2) {
        this.position.x = canvas.width - this.width * 2;
      }
    }
  }
  

class Platform {
  constructor(x, y) {
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = proportionalSize(40);
  }
  draw() {
    ctx.fillStyle = "#A0A0A0";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class CheckPoint {
  constructor(x, y, z) {
    this.position = {
      x,
      y,
    };
    this.width = proportionalSize(40);
    this.height = proportionalSize(70);
    this.claimed = false;
  };

  draw() {
    ctx.fillStyle = "#f1be32";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  claim() {
    this.width = 0;
    this.height = 0;
    this.position.y = Infinity;
    this.claimed = true;
  }
};

const player = new Player();

const platformPositions = [
  { x: 500, y: proportionalSize(450) },
  { x: 700, y: proportionalSize(400) },
  { x: 850, y: proportionalSize(350) },
  { x: 900, y: proportionalSize(350) },
  { x: 1050, y: proportionalSize(150) },
  { x: 2500, y: proportionalSize(450) },
  { x: 2900, y: proportionalSize(400) },
  { x: 3150, y: proportionalSize(350) },
  { x: 3900, y: proportionalSize(450) },
  { x: 4200, y: proportionalSize(400) },
  { x: 4400, y: proportionalSize(200) },
  { x: 4700, y: proportionalSize(150) },
];

const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y)
);

const checkpointPositions = [
  { x: 1170, y: proportionalSize(80), z: 1 },
  { x: 2900, y: proportionalSize(330), z: 2 },
  { x: 4800, y: proportionalSize(80), z: 3 },
];

const checkpoints = checkpointPositions.map(
  (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z)
);

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  platforms.forEach((platform) => {
    platform.draw();
  });

  checkpoints.forEach(checkpoint => {
    checkpoint.draw();
  });

  player.update();

  if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
    player.velocity.x = 5;
  } else if (keys.leftKey.pressed && player.position.x > proportionalSize(100)) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });

      checkpoints.forEach((checkpoint) => {
        checkpoint.position.x -= 5;
      });
    
    } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });

      checkpoints.forEach((checkpoint) => {
        checkpoint.position.x += 5;
      });
    }
  }

  platforms.forEach((platform) => {
    const collisionDetectionRules = [
      player.position.y + player.height <= platform.position.y,
      player.position.y + player.height + player.velocity.y >= platform.position.y,
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
    ];

    if (collisionDetectionRules.every((rule) => rule)) {
      player.velocity.y = 0;
      return;
    }

    const platformDetectionRules = [
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
      player.position.y + player.height >= platform.position.y,
      player.position.y <= platform.position.y + platform.height,
    ];

    if (platformDetectionRules.every(rule => rule)) {
      player.position.y = platform.position.y + player.height;
      player.velocity.y = gravity;
    };
  });

  checkpoints.forEach((checkpoint, index, checkpoints) => {
    const checkpointDetectionRules = [
      player.position.x >= checkpoint.position.x,
      player.position.y >= checkpoint.position.y,
      player.position.y + player.height <=
        checkpoint.position.y + checkpoint.height,
      isCheckpointCollisionDetectionActive,
      player.position.x - player.width <=
        checkpoint.position.x - checkpoint.width + player.width * 0.9,
      index === 0 || checkpoints[index - 1].claimed === true,
    ];

    if (checkpointDetectionRules.every((rule) => rule)) {
      checkpoint.claim();

      
      if (index === checkpoints.length - 1) {
        isCheckpointCollisionDetectionActive = false;
        showCheckpointScreen("You reached the final checkpoint!");
        movePlayer("ArrowRight", 0, false);
      } else if (player.position.x >= checkpoint.position.x && player.position.x <= checkpoint.position.x + 40) {
    
    showCheckpointScreen("You reached a checkpoint!");
}


};
});
}


const keys = {
rightKey: {
  pressed: false
},
leftKey: {
  pressed: false
}
};

const movePlayer = (key, xVelocity, isPressed) => {
if (!isCheckpointCollisionDetectionActive) {
  player.velocity.x = 0;
  player.velocity.y = 0;
  return;
}

switch (key) {
  case "ArrowLeft":
    keys.leftKey.pressed = isPressed;
    if (xVelocity === 0) {
      player.velocity.x = xVelocity;
    }
    player.velocity.x -= xVelocity;
    break;
  case "ArrowUp":
  case " ":
  case "Spacebar":
    player.velocity.y -= 8;
    break;
  case "ArrowRight":
    keys.rightKey.pressed = isPressed;
    if (xVelocity === 0) {
      player.velocity.x = xVelocity;
    }
    player.velocity.x += xVelocity;
}
}

const startGame = () => {
canvas.style.display = "block";
startScreen.style.display = "none";
animate();
}

const showCheckpointScreen = (msg) => {
checkpointScreen.style.display = "block";
checkpointMessage.textContent = msg;
if (isCheckpointCollisionDetectionActive) {
  setTimeout(() => (checkpointScreen.style.display = "none"), 2000);
}
};

startBtn.addEventListener("click", startGame);

window.addEventListener("keydown", ({ key }) => {
movePlayer(key, 8, true);
});

window.addEventListener("keyup", ({ key }) => {
movePlayer(key, 0, false);
});