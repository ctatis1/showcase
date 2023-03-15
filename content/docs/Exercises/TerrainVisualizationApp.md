# Exercise Color Models 

{{< hint info >}}
**Exercise 2**  
Develop a terrain visualization application. Check out the 3D terrain generation with Perlin noise coding train tutorial.
{{< /hint >}}

## What is Perlin Noise?

Perlin noise is a method of generating sets of random structured numbers. While a normal random number generator will produce outputs that are completely independent from each other — excellent if you’re trying to generate a password or shuffle a deck, there are lots of instances where you want some coherence in the randomness.

Perlin noise does just that — it generates random numbers that follow a smooth gradient. This means that if you sample the generator at two nearby points (say 0.5 and 0.6) you’ll get back two similar results (0.143 and 0.144). These structured random numbers can be used in many applications such as cloud generation, water simulation, and terrain generation.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*rAR1PA31CXl60YkRzg8HxA.jpeg" alt="Perlin Noise Example">

## Code

### Terrain Visualization Application
{{< details title="Terrain Visualization Application" open=true >}}
{{< highlight javascript >}}
/* Source code https://github.com/CodingTrain/website-archive/blob/main/CodingChallenges/CC_011_PerlinNoiseTerrain/Processing/CC_011_PerlinNoiseTerrain/CC_011_PerlinNoiseTerrain.pde 

SpeedSlider added in order to view it faster or slower
StrokeBtn added in order to view the stroke lines

*/

var cols, rows;
var scl = 20;
var w = 1000;
var h = 1000;

var flying = 0;

let speedSlider;
let strokeBtn;

var terrain = [];

function setup() {
  createCanvas(600, 400, WEBGL);
  cols = w / scl;
  rows = h / scl;
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
  speedSlider = createSlider(0, 0.01, 0.001, 0.0001);
  speedSlider.position(10, 10);
  speedSlider.style('width', '80px');
  
  strokeBtn = createCheckbox('stroke', false);
  strokeBtn.position(10, 30);
}

function draw() {

  flying -= speedSlider.value();
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  
  background(150,0,200);
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 120);

  if(strokeBtn.checked()) {
    noStroke();
  } else {
    stroke(20);
  }
  
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}
{{< /highlight >}}
{{< /details >}}

{{< p5-global-iframe id="breath" width="600" height="400" >}}

var cols, rows;
var scl = 20;
var w = 1000;
var h = 1000;

var flying = 0;

let speedSlider;
let strokeBtn;

var terrain = [];

function setup() {
  createCanvas(600, 400, WEBGL);
  cols = w / scl;
  rows = h / scl;
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
  speedSlider = createSlider(0, 0.01, 0.001, 0.0001);
  speedSlider.position(10, 10);
  speedSlider.style('width', '80px');
  
  strokeBtn = createCheckbox('stroke', false);
  strokeBtn.position(10, 30);
}

function draw() {

  flying -= speedSlider.value();
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  
  background(150,0,200);
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 120);

  if(strokeBtn.checked()) {
    noStroke();
  } else {
    stroke(20);
  }
  
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}

{{< /p5-global-iframe >}}