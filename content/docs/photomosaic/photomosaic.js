let mosaic;
let symbol1;
let myImage;
let debug;
let slider;
const WIDTH_PIXEL = 64;
const HEIGHT_PIXEL = 64;
const NUM_IMAGES = 99;
function preload() {
  myImage = loadImage("/showcase/docs/photomosaic/avtar.jpg");
  symbol1 = loadImage("/showcase/docs/photomosaic/dataset1.png");
  mosaic = loadShader(
    "/showcase/docs/photomosaic/shader.vert",
    "/showcase/docs/photomosaic/photomosaic.frag"
  );
}

function setup() {
  slider = createSlider(1, 6, 2,1);
  slider.position(50, 560);
  slider.style('width', '100px');
  createCanvas(700, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  mosaic.setUniform("image", myImage);
  mosaic.setUniform("WIDTH_PIXEL", WIDTH_PIXEL);
  mosaic.setUniform("NUM_IMAGES", NUM_IMAGES);
  mosaic.setUniform("HEIGHT_PIXEL", HEIGHT_PIXEL);
  debug = true;
  mosaic.setUniform("debug", debug);
  let img = symbol1;
  mosaic.setUniform("symbol1", img);
}

function draw() {
  mosaic.setUniform("resolution", Math.pow(10,slider.value()));

  background(33);
  cover(true);
}

function cover(texture = false) {
  beginShape();
  if (texture) {
    //texture(img);
    vertex(-width / 2, -height / 2, 0, 0, 0);
    vertex(width / 2, -height / 2, 0, 1, 0);
    vertex(width / 2, height / 2, 0, 1, 1);
    vertex(-width / 2, height / 2, 0, 0, 1);
  } else {
    vertex(-width / 2, -height / 2, 0);
    vertex(width / 2, -height / 2, 0);
    vertex(width / 2, height / 2, 0);
    vertex(-width / 2, height / 2, 0);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (key === "z") {
    debug = !debug;
    mosaic.setUniform("debug", debug);
  }
}