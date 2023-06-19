let colorShader;
let slider;

function preload() {
  colorShader = readShader('/Showcase/content/docs/colorBlend/color.frag',
                          { matrices: Tree.NONE, varyings: Tree.color4 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(400, 400, WEBGL);
  // Color pickers
  colorPickerA = createColorPicker('yellow');
  colorPickerA.position(5, 5);
  colorPickerB = createColorPicker('cyan');
  colorPickerB.position(80, 5);
  slider = createSlider(0, 255, 200);
  slider.position(160, 200);
  slider.style('width', '80px');
  sel = createSelect();
  sel.position(200, 10);
  sel.option('ADD');
  sel.option('DIFFERENCE');
  sel.option('MULTIPLY');
  sel.option('INVERSE');
  sel.option('LIGHTEST');
  sel.option('DARKEST');
}

function draw() {
  background(0);
  // Update the color variables in the shader
  updateShaderColors();
  // Draw the two regular rectangles
  resetShader();
  fill(colorPickerA.color());
  rect(-150, -150, 100, 100);
  fill(colorPickerB.color());
  rect(0, -150, 100, 100);
  // Draw with blend mode shader
  shader(colorShader);
  beginShape();
  vertex(-0.25, -0.75);
  vertex(-0.25, -0.25);
  vertex(0.25, -0.25);
  vertex(0.25, -0.75);
  endShape(CLOSE);
}

function updateShaderColors(){
    colorShader.setUniform('colorA', [ red(colorPickerA.color())/255,
                                        green(colorPickerA.color())/255,
                                        blue(colorPickerA.color())/255,
                                        alpha(colorPickerA.color())/255]);
    colorShader.setUniform('colorB', [  red(colorPickerB.color())/255,
                                        green(colorPickerB.color())/255,
                                        blue(colorPickerB.color())/255,
                                        alpha(colorPickerB.color())/255]);
    colorShader.setUniform('alphaValue', slider.value()/255.0);
    let item = 1;
    if( sel.value() == 'ADD' ) item = 1;
    else if( sel.value() == 'DIFFERENCE' ) item = 2;
    else if( sel.value() == 'MULTIPLY' ) item = 3;
    else if( sel.value() == 'INVERSE' ) item = 4;
    else if( sel.value() == 'LIGHTEST' ) item = 5;
    else if( sel.value() == 'DARKEST' ) item = 6;
    //print(item);
    colorShader.setUniform('blendMode', item);                                      
}
