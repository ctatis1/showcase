var mocSize;
var image;
var modeSelect;
var mode;

let p = 0;
let size = 600;
var images = [];
var lumaValues = [];

function preload() {
  for (i = 0; i < 30; i++) {
    let newImage = loadImage(`/showcase/docs/photomosaic/assets/photo${i + 1}.jpg`);
    images.push(newImage);
  }
  image = loadImage("/showcase/docs/photomosaic/assets/avtar.jpg");
}

function setup() {
  createCanvas(size, size);
  image.loadPixels();
  image.resize(size, size);
  for (i = 0; i < 30; i++) {
    images[i].loadPixels();
    let sum = 0;
    for (j = 0; j < images[i].pixels.length; j += 4) {
      let r = images[i].pixels[j];
      let g = images[i].pixels[j + 1];
      let b = images[i].pixels[j + 2];
      let a = images[i].pixels[j + 3];
      sum += luma(r, g, b);
    }
    let avg = sum / (images[i].pixels.length / 4);
    lumaValues.push(avg);
    images[i].resize(size, size);
  }
  console.log(lumaValues);
  mocSize = createSlider(3, 100, 10, 1);
  mocSize.position(10, 10);
  mocSize.style("width", "80px");

}

function draw() {
  background(0);
  for (i = 0; i < size; i += mocSize.value()) {
    for (j = 0; j < size; j += mocSize.value()) {
      let index = (j * size + i) * 4;
      let r = image.pixels[index];
      let g = image.pixels[index + 1];
      let b = image.pixels[index + 2];
      let c = color(r, g, b);

      let bValue = luma(r, g, b);
      let diff = Math.abs(lumaValues[0] - bValue);
      let imageIndex = 0;
      for (k = 1; k < lumaValues.length; k++) {
        if (diff > Math.abs(lumaValues[k] - bValue)) {
          imageIndex = k;
          diff = Math.abs(lumaValues[k] - bValue);
        }
      }
      image(images[imageIndex], i, j, Math.min(mocSize.value(), size - i), Math.min(mocSize.value(), size - j));
    }
  }
}

function keyPressed() {
  if (key == "r") {
    p = (p + 1) % 30;
    image.copy(images[p], 0, 0, size, size, 0, 0, size, size);
    image.loadPixels();
  }
}

function luma(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}