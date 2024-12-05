export default class Button {
  constructor(x, y, width, height, text, callback) {
    this.buttonX = x;
    this.buttonY = y;
    this.buttonWidth = width;
    this.buttonHeight = height;
    this.buttonText = text;
    this.callback = callback;
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
    textAlign(CENTER, CENTER);
    text(this.buttonText, this.buttonWidth / 2, this.buttonHeight / 2);
    pop();
  }

  //checking if the buttons are pressed or not
  hitTest(x, y) {
    return (
      x > this.buttonX &&
      x < this.buttonX + this.buttonWidth &&
      y > this.buttonY &&
      y < this.buttonY + this.buttonHeight
    );
  }

  mouseClicked() {
    if (this.hitTest(mouseX, mouseY)) {
      this.callback();
    }
  }
}
