let shaderM;
let img;

let maskCB;
let lumaCB;
let roiCB;
let magnifierCB;
let radiusSlider;

function preload() {
  shaderM = readShader('/showcase/docs/imageProcessing/mask.frag',{ varyings: Tree.texcoords2 });
  img = loadImage('/showcase/docs/imageProcessing/Lego.jpg');
}

function setup() {
  createCanvas(640, 640, WEBGL);
  noStroke();

  textureMode(NORMAL);
  shader(shaderM);

  magnifierCB = createCheckbox('Magnifier', false);
  magnifierCB.position(10, 30);
  magnifierCB.style('color', 'white');
  magnifierCB.input(uniformUpdate);

  maskCB = createCheckbox('mask', false);
  maskCB.position(10, 50);
  maskCB.style('color', 'white');
  maskCB.input(uniformUpdate);

  lumaCB = createCheckbox('Luma', false);
  lumaCB.position(10, 70);
  lumaCB.style('color', 'white');
  lumaCB.input(uniformUpdate);

  roiCB = createCheckbox('Region of interest', false);
  roiCB.position(10, 90);
  roiCB.style('color', 'white');
  roiCB.input(uniformUpdate);

  radiusSlider = createSlider(0, 100, 20);
  radiusSlider.position(10, 110);
  radiusSlider.style('width', '80px');

  sel = createSelect();
  sel.position(10,10);
  sel.option('Gaussian blur');
  sel.option('Edges');
  sel.input(uniformUpdate);

  uniformUpdate(); 
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
  shaderM.setUniform('mouseAction', [mouseX/width, mouseY/height]);
}

function uniformUpdate(){
  shaderM.setUniform('apply_mask',maskCB.checked());
  shaderM.setUniform('luma',lumaCB.checked());
  shaderM.setUniform('roi',roiCB.checked());
  shaderM.setUniform('magnifier',magnifierCB.checked());

  if(sel.value() == 'Gaussian blur'){
    shaderM.setUniform('mask', [1.0/16.0 , 2.0/16.0 , 1.0/16.0 ,  
                                2.0/16.0 , 4.0/16.0 , 2.0/16.0 ,  
                                  1.0/16.0 , 2.0/16.0 , 1.0/16.0]);
  }else if(sel.value() == 'Edges'){
    shaderM.setUniform('mask', [-1.0 , -1.0 , -1.0 ,  
                                -1.0 , 8.0 , -1.0 ,  
                                -1.0 , -1.0 , -1.0 , ]);
  }
}