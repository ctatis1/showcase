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

<img src="/showcase/docs/photomosaic/assets/avtar.jpg" alt="SAvatar">

### Dataset

## Code

### Photomosaic
{{< details title="Photomosaic.frag" open=false >}} {{< highlight javascript >}} 
precision mediump float;

uniform sampler2D image;
uniform sampler2D symbol1;
uniform bool debug;
uniform float resolution;
uniform float NUM_IMAGES;
uniform float WIDTH_PIXEL;
uniform float HEIGHT_PIXEL;

varying vec2 vTexCoord;
varying vec4 vVertexColor;

float module( float x , float y ){
    float flt_res = x-(y*(floor(x/y)));
    return flt_res;
}

void main() {
    vec2 symbolCoord=vTexCoord*resolution;
    vec2 imageCoord=floor(symbolCoord);
    symbolCoord=symbolCoord-imageCoord;
    imageCoord=imageCoord*vec2(1.0)/vec2(resolution);
    vec4 col=texture2D(image,imageCoord);
    float brightness = dot(col.xyz, vec3(0.2126, 0.7152, 0.0722));
    float temp=brightness*(NUM_IMAGES);
    float level=floor(temp);
    float scalingfactor = 1.0/NUM_IMAGES;
    float y0=0.0;
    float x0= module(level,NUM_IMAGES)*scalingfactor;
    vec2 myCoord=(symbolCoord*vec2(1.0)/vec2(NUM_IMAGES,1))+vec2(x0,y0);
    vec4 finalColor=texture2D(symbol1,myCoord);
    gl_FragColor = debug?finalColor:col;
}
{{< /highlight >}} {{< /details >}}
{{< details title="Photomosaic" open=false >}} {{< highlight javascript >}} 
let mosaic;
let dataset;
let image;
let debug;
let slider;

const WIDTH_PIXEL = 64;
const HEIGHT_PIXEL = 64;
const NUM_IMAGES = 99;

function preload() {
  image = loadImage("/showcase/docs/photomosaic/avtar.jpg");
  dataset = loadImage("/showcase/docs/photomosaic/dataset.png");
  mosaic = loadShader("/showcase/docs/photomosaic/shader.vert","/showcase/docs/photomosaic/photomosaic.frag");
}

function setup() {
  slider = createSlider(1, 6, 2, 1);
  slider.position(50, 60);
  slider.style('width', '100px');
  createCanvas(700, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  mosaic.setUniform("image", image);
  mosaic.setUniform("WIDTH_PIXEL", WIDTH_PIXEL);
  mosaic.setUniform("NUM_IMAGES", NUM_IMAGES);
  mosaic.setUniform("HEIGHT_PIXEL", HEIGHT_PIXEL);
  debug = true;
  mosaic.setUniform("debug", debug);
  let img = dataset;
  mosaic.setUniform("dataset", img);
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
{{< /highlight >}} {{< /details >}}


{{< p5-global-iframe id="breath" width="700" height="600" >}}

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.js"></script>
<script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js"></script>
<script src="/showcase/docs/photomosaic/photomosaic.js"></script> 

{{< /p5-global-iframe >}}


## References
* [DISEÑO DE FOTOMOSAICO](https://fotomosaico.com/diseno-fotomosaico) by Fotomosaico®
* [Implementing Photomosaics](https://www.geeksforgeeks.org/implementing-photomosaics/) by GeeksForGeeks
* [Archives of sample photos for photomosaic -Archive with christmas images.](https://www.artensoft.com/ArtensoftPhotoMosaicWizard/photobases.php) by Artensoft