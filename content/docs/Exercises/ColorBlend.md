# Excercise Color Blend

{{< hint info >}}
**Exercise 1**  
Implement other blending modes.
{{< /hint >}}

# Introduction
## What is a blending mode?
Blending Modes are mathematical equations that blend layers based on their hue, saturation, luminosity, or a combination of these components.

You can use Blending Modes to apply overlays, textures, or target adjustments to specific areas of your image without creating layer masks.

Blending Modes are an excellent way to create nondestructive effects. The blend you apply does not change pixels, only the visual output. You can always change or remove the Blending Mode.

# Solution
In the application that is proposed to be developed, new blending modes are added such as:
Addition, subtraction, multiplication, inverse, lightest and darkest. In each of them, the respective operations are carried out with the RGB values ​​of the selected colors.

# Code

{{< p5-global-iframe id="breath" width="410" height="450" >}}
let colorShader;
let slider;

function preload() {
  colorShader = readShader('/VisualComputing2022-2/docs/excercises/color.frag',
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
  sel.option('SCREEN');
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
    else if( sel.value() == 'SCREEN' ) item = 4;
    else if( sel.value() == 'LIGHTEST' ) item = 5;
    else if( sel.value() == 'DARKEST' ) item = 6;
    //print(item);
    colorShader.setUniform('blendMode', item);                                      
}
{{< /p5-global-iframe >}}


