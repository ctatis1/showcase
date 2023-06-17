let uvShader;
let img;
let inputColor; 

function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/showcase/docs/imageProcessing/imgprocessing.frag',
                        {varyings: Tree.texcoords2 });
  img = loadImage("/showcase/docs/imageProcessing/Lego.jpg");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(580,670, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(uvShader);
  uvShader.setUniform("texture",img);
  uvShader.setUniform("iResolution",[650,800]);
}

function draw() {
  background(0);
  uvShader.setUniform("iMouse",[mouseX,mouseY]);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
      width / 2, height / 2, -width / 2, height / 2);
}