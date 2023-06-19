let maskShader;
let img;
let vid;
let video_checkbox;
let mask_checkbox;
let luma_checkbox;
let roi_checkbox;
let magnifier_checkbox;
let radius_slider;

function preload() {
  maskShader = readShader('/showcase/docs/imageProcessing/mask.frag',{ varyings: Tree.texcoords2 });
  img = loadImage('/showcase/docs/imageProcessing/Lego.jpg');
}

function setup() {
  createCanvas(640, 640, WEBGL);
  noStroke();

  textureMode(NORMAL);
  shader(maskShader);

  magnifier_checkbox = createCheckbox('Magnifier', false);
  magnifier_checkbox.position(10, 30);
  magnifier_checkbox.style('color', 'white');
  magnifier_checkbox.input(uniformUpdate);

  mask_checkbox = createCheckbox('mask', false);
  mask_checkbox.position(10, 50);
  mask_checkbox.style('color', 'white');
  mask_checkbox.input(uniformUpdate);

  luma_checkbox = createCheckbox('Luma', false);
  luma_checkbox.position(10, 70);
  luma_checkbox.style('color', 'white');
  luma_checkbox.input(uniformUpdate);

  roi_checkbox = createCheckbox('Region of interest', false);
  roi_checkbox.position(10, 90);
  roi_checkbox.style('color', 'white');
  roi_checkbox.input(uniformUpdate);

  radius_slider = createSlider(0, 100, 20);
  radius_slider.position(10, 110);
  radius_slider.style('width', '80px');

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
  maskShader.setUniform('mouse', [mouseX/width, mouseY/height]);
}

function uniformUpdate(){
  maskShader.setUniform('apply_mask',mask_checkbox.checked());
  maskShader.setUniform('luma',luma_checkbox.checked());
  maskShader.setUniform('roi',roi_checkbox.checked());
  maskShader.setUniform('magnifier',magnifier_checkbox.checked());

  if( sel.value() == 'Gaussian blur' ){
    maskShader.setUniform('mask', [1.0/16.0,2.0/16.0,1.0/16.0, 2.0/16.0,4.0/16.0,2.0/16.0, 1.0/16.0,2.0/16.0,1.0/16.0]);
  }else if( sel.value() == 'Edges' ){
    maskShader.setUniform('mask', [-1.0,-1.0,-1.0, -1.0,8.0,-1.0, -1.0,-1.0,-1.0,]);
  }
}