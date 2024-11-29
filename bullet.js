let bullets = [];

class Bullet {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 15;
  }

  move() {
    this.y = this.y - this.speed;
    this.speed *= 0.99;
  }

  draw() {
    push();
    noStroke();
    fill(0);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  shot() {
    return this.y + this.height < 0;
  }
}

function createBullet(x, y) {
  let bullet = new Bullet(x, y, 20, 32);
  bullets.push(bullet);
}

function setup() {
  createCanvas(600, 800);
}

function draw() {
  background(255, 255, 255);
  for (let bullet of bullets) {
    bullet.move();
    bullet.draw();

    if (bullet.shot()) {
      let bulletIndex = bullets.indexOf(bullet);
      if (bulletIndex !== -1) {
        bullets.splice(bulletIndex, 1);
      }
    }
  }
}

function keyPressed() {
  if (key === " ") {
    // Code to run.
    createBullet(300, 500);
  }
}
