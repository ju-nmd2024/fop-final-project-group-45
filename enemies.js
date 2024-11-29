function setup() {
  createCanvas(600, 800);
}

class Enemy {
  constructor(x, y, width, height) {
    this.enemyX = x;
    this.enemyY = y;
    this.width = width;
    this.height = height;
    this.speed = 0.5;
  }

  draw() {
    push();
    fill(0);
    rect(this.enemyX, this.enemyY, this.width, this.height);
    pop();
  }

  move() {
    this.enemyX += this.speed;

    let enemies = [];
    let rows = 5;
    let columns = 8;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let x = 50 + j * 50;
        let y = 50 + i * 50;
        enemies.push(new Enemy(x, y, 30, 40));
      }
    }
  }

  //help from https://chatgpt.com/share/6748c9dc-037c-8000-a2b5-490cf0a04f03
  moveDown() {
    this.enemyY += 40;
  }
  //help stopped

  // const enemy = new Enemy(10, 10, 30, 40);
} // help done

function draw() {
  background(255);
  //help from https://chatgpt.com/share/6748c9dc-037c-8000-a2b5-490cf0a04f03
  let edgeReached = false;

  for (let nemy of enemies) {
    Enemy.draw();
    Enemy.move();

    //maked that enemies have reached an edge
    if (Enemy.enemyX <= 0 || Enemy.enemyX + Enemy.width >= 600) {
      edgeReached = true;
    }
  }

  if (edgeReached) {
    for (let enemy of enemies) {
      enemy.speed *= -0.5;
      enemy.moveDown();
    }
  }
}

//can we use this for speed?
// if (frameCount % 5 === 0) {
//   snake.update();
// }
// snake.draw();

// counter++;

// //trying to make the array reversed
// function reverse(enemies) {
//   let reversedArray = [];
//   for (let element of array) {
//     reversedArray.unshift(element);
//   }
//   return reversedArray;
//}
