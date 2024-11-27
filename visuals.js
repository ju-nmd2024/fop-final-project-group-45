let img;

// Load the image and create a p5.Image object.
function preload() {
  img = loadImage("/assets/startScreen.png");
}

function setup() {
  createCanvas(600, 800);

  // Draw the image.
  image(img, 0, 0);
}

function draw() {
  image(img, 0, 0);
}
