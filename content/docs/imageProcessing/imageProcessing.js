let maskShader;
let img;
let video_checkbox;
let mask_checkbox;
let luma_checkbox;
let roi_checkbox;
let magnifier_checkbox;
let radius_slider;

function preload() {
  maskShader = readShader('/shaders/mask.frag',
                        { varyings: Tree.texcoords2 });
  
  img = loadImage('/media/image.jpg');
}

function setup() {
  createCanvas(640, 640, WEBGL);
  noStroke();
  
  textureMode(NORMAL);
  shader(maskShader);
  
  video_checkbox = createCheckbox('video', false);
  video_checkbox.position(10, 10);
  video_checkbox.style('color', 'white');
  video_checkbox.input(uniformUpdate);
  mask_checkbox = createCheckbox('mask', false);
  mask_checkbox.position(10, 30);
  mask_checkbox.style('color', 'white');
  mask_checkbox.input(uniformUpdate);
  luma_checkbox = createCheckbox('luma', false);
  luma_checkbox.position(10, 50);
  luma_checkbox.style('color', 'white');
  luma_checkbox.input(uniformUpdate);
  roi_checkbox = createCheckbox('Region of interest', false);
  roi_checkbox.position(10, 70);
  roi_checkbox.style('color', 'white');
  roi_checkbox.input(uniformUpdate);
  magnifier_checkbox = createCheckbox('Magnifier', false);
  magnifier_checkbox.position(10, 90);
  magnifier_checkbox.style('color', 'white');
  magnifier_checkbox.input(uniformUpdate);
  radius_slider = createSlider(0, 100, 20);
  radius_slider.position(10, 110);
  radius_slider.style('width', '80px');
  
  sel = createSelect();
  sel.position(500,10);
  sel.option('Gaussian blur');
  sel.option('Sharpening');
  sel.option('Edges');
  sel.option('Emboss');
  sel.input(uniformUpdate);
  
  uniformUpdate();
  
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
  
  maskShader.setUniform('mouse', [mouseX/width, mouseY/height]);
  maskShader.setUniform('actionRadius', radius_slider.value()/100.0);
}


function uniformUpdate(){
  
  if(video_checkbox.checked()){
    maskShader.setUniform('texture', vid);
    maskShader.setUniform('texOffset', [1 / vid.width, 1 / vid.height])
  }else{
    maskShader.setUniform('texture', img);
    maskShader.setUniform('texOffset', [1 / img.width, 1 / img.height])
  }
  
  maskShader.setUniform('apply_mask',mask_checkbox.checked());
  
  maskShader.setUniform('luma',luma_checkbox.checked());
  
  if( sel.value() == 'Gaussian blur' ){
    maskShader.setUniform('mask', [1.0/16.0,2.0/16.0,1.0/16.0, 2.0/16.0,4.0/16.0,2.0/16.0, 1.0/16.0,2.0/16.0,1.0/16.0]);
  }else if( sel.value() == 'Sharpening' ){
    maskShader.setUniform('mask', [0.0,-1.0,0.0, -1.0,5.0,-1.0, 0.0,-1.0,0.0]);
  }else if( sel.value() == 'Edges' ){
    maskShader.setUniform('mask', [-1.0,-1.0,-1.0, -1.0,8.0,-1.0, -1.0,-1.0,-1.0,]);
  }else if( sel.value() == 'Emboss' ){
    maskShader.setUniform('mask', [-2.0,-1.0,0.0, -1.0,1.0,1.0, 0.0,1.0,2.0]);
  }
  
  maskShader.setUniform('roi',roi_checkbox.checked());
  
  maskShader.setUniform('magnifier',magnifier_checkbox.checked());
}