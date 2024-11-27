class Button {
  constructor(x, y, width, height, text) {
    this.buttonX = x;
    this.buttonY = y;
    this.buttonWidth = width;
    this.buttonHeight = height;
    this.buttonText = text;
  }

  draw() {
    push();
    translate(this.buttonX, this.buttonY);
    stroke(255, 255, 255);
    strokeWeight(5);
    fill(255, 230, 0);
    rect(0, 0, this.buttonWidth, this.buttonHeight, this.buttonHeight / 2);
    // the text
    noStroke();
    fill(0);
    textSize(this.buttonHeight / 2);
    textAlign(CENTER);
    text(this.buttonText, 0, this.buttonHeight / 4, this.buttonWidth);
    pop();
  }
}

const startButton = new Button(100, 100, 250, 60, "Start the game");
const instructionsButton = new Button(100, 200, 250, 60, "Instructions");

function draw() {
  startButton.draw();
  instructionsButton.draw();
}
