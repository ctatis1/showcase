# Exercise Photomosaic

{{< hint info >}}
**Exercise 4**  
Implement a mosaic visual application.
{{< /hint >}}

## Background Information

### Photomosaic

A photomosaic is a photo composed of a collection of images arranged in such a way as to present a larger image. This larger image consists of a two-dimensional array or matrix of other smaller images, which when viewed from close up you can see each of the photos and when viewed from a distance all of the small composite images form a photo.

At Fotomosaico we can use your digital photos to create a larger photo that when viewed up close you will be able to appreciate your entire photo collection.

We can create a photomosaic for any application you need, our company has worked to create posters, postcards, magazine covers to large spectacular.

### How to create Photomosaics?

1. Read the images from the dataset, which will replace the squares of the original image.
2. Read the original image and divide it into M x N squares forming the mosaic.
3. For each frame, find the best match of the images in the dataset.
4. Create the final photomosaic by arranging the selected dataset images.

### Splitting the images into tiles

Now let’s look at how to calculate the coordinates for a single tile from this grid. The tile with index (i, j) has a top-left corner coordinate of (i*w, i*j) and a bottom-right corner coordinate of ((i+1)*w, (j+1)*h), where w and h stand for the width and height of a tile, respectively. These can be used with the PIL to crop and create a tile from this image.

<img src="https://media.geeksforgeeks.org/wp-content/uploads/Capture_2-1.jpg" alt="Splitting images into tiles">

## Image and Dataset

### Original Image

<img src="/showcase/docs/photomosaic/assets/Lego.jpg" alt="SAvatar">

### Dataset

<img src="/showcase/docs/photomosaic/assets/dataset.png" alt="SAvatar">

## Code

### Photomosaic
{{< details title="Photomosaic" open=false >}} {{< highlight javascript >}} 
var mocSize;
var img;
var imgs = [];
var size = 600;
var lumaValues = [];
var modeSelect;
var mode;
let p = 0;

function preload() {
  for (i = 0; i < 19; i++) {
    let imgNew = loadImage(`/showcase/docs/photomosaic/assets/photo${i + 1}.jpg`);
    imgs.push(imgNew);
  }
  img = loadImage(`/showcase/docs/photomosaic/assets/Lego.jpg`);
}

function setup() {
  createCanvas(size, size);
  img.loadPixels();
  img.resize(size, size);
  for (i = 0; i < 30; i++) {
    imgs[i].loadPixels();
    let sum = 0;
    for (j = 0; j < imgs[i].pixels.length; j += 4) {
      let r = imgs[i].pixels[j];
      let g = imgs[i].pixels[j + 1];
      let b = imgs[i].pixels[j + 2];
      let a = imgs[i].pixels[j + 3];
      sum += luma(r, g, b);
    }
    let avg = sum / (imgs[i].pixels.length / 4);
    lumaValues.push(avg);
    imgs[i].resize(size, size);
  }
  mocSize = createSlider(3, 100, 10, 1);
  mocSize.position(10, 10);
  mocSize.style("width", "80px");
  modeSelect = createSelect();
  modeSelect.position(10, 30);
  modeSelect.option("Original");
  modeSelect.option("Keys");
  modeSelect.option("Symbols");
  modeSelect.selected("Original");
}

function draw() {
  background(0);
  mode = modeSelect.value();
  if (mode == "Original") {
    image(img, 0, 0);
  } else {
    for (i = 0; i < size; i += mocSize.value()) {
      for (j = 0; j < size; j += mocSize.value()) {
        let index = (j * size + i) * 4;
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
        let c = color(r, g, b);
        if (mode == "Symbols") {
          let bValue = luma(r, g, b);
          let diff = Math.abs(lumaValues[0] - bValue);
          let imgIndex = 0;
          for (k = 1; k < lumaValues.length; k++) {
            if (diff > Math.abs(lumaValues[k] - bValue)) {
              imgIndex = k;
              diff = Math.abs(lumaValues[k] - bValue);
            }
          }
          image(
            imgs[imgIndex],
            i,
            j,
            Math.min(mocSize.value(), size - i),
            Math.min(mocSize.value(), size - j)
          );
        } else {
          fill(c);
          noStroke();
          rect(i, j, mocSize.value(), mocSize.value());
        }
      }
    }
  }
}
function luma(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}
{{< /highlight >}} {{< /details >}}


{{< p5-iframe sketch="/showcase/docs/photomosaic/photomosaic.js" width="625" height="625">}}


## References
* [DISEÑO DE FOTOMOSAICO](https://fotomosaico.com/diseno-fotomosaico) by Fotomosaico®
* [Implementing Photomosaics](https://www.geeksforgeeks.org/implementing-photomosaics/) by GeeksForGeeks
* [Archives of sample photos for photomosaic -Archive with christmas images.](https://www.artensoft.com/ArtensoftPhotoMosaicWizard/photobases.php) by Artensoft