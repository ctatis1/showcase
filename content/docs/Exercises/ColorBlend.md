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


{{< details title="Color Blend" open=true >}}
{{< highlight javascript >}}
let colorShader;
let slider;

function preload() {
   colorShader = readShader('/showcase/docs/colorBlend/color.frag',
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
{{< /highlight >}}
{{< /details >}} 

{{< details title="color.frag" open=true >}}
{{< highlight javascript >}}

precision mediump float;

uniform vec4 colorA;
uniform vec4 colorB;
uniform float alphaValue;
uniform int blendMode;

// interpolated color is emitted from the vertex shader
// where the variable is defined in the same exact way
// see your console!
varying vec4 color4;

float luminosity(vec4 color) {
  return (color.r + color.g + color.b)/3.0;
}

void main() {
  if( blendMode == 1 ){ // ADD
    gl_FragColor = (colorA + colorB) * alphaValue;
  }else if( blendMode == 2 ){ // DIFFERENCE
    gl_FragColor = (colorA - colorB) * alphaValue;
  }else if( blendMode == 3 ){ // MULTIPLY
    gl_FragColor = colorA * colorB * alphaValue;
  }else if( blendMode == 4 ){ // SCREEN
    gl_FragColor = (vec4((vec3(1.0) - colorA.rgb), colorA.a) * vec4((vec3(1.0) - colorB.rgb), colorB.a)) * alphaValue;
  }else if( blendMode == 5 ){ // LIGHTEST
    if( luminosity(colorA) >= luminosity(colorB) ) gl_FragColor = colorA * alphaValue;
    else gl_FragColor = colorB * alphaValue;
  }else if( blendMode == 6 ){ // DARKEST
    if( luminosity(colorA) <= luminosity(colorB) ) gl_FragColor = colorA * alphaValue;
    else gl_FragColor = colorB * alphaValue;
  }
}
{{< /highlight >}}
{{< /details >}} 


{{< p5-global-iframe id="breath" width="410" height="450" >}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.js"></script>
<script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js"></script>
<script src="/showcase/docs/colorBlend/app.js"></script>
{{< /p5-global-iframe >}}

# Conclusions
There are many types of color blend that can be used in different situations. In the same way, these can be used individually for each pixel and achieve varied and different effects.
# References
Photoshop Training Channel. (s. f.). Blending Modes Explained. Photoshop Training Channel. Recuperado el 18 de junio de 2023, de https://photoshoptrainingchannel.com/blending-modes-explained/
p5.js. (s.f.). blendMode. Recuperado el 18 de junio de 2023, de https://p5js.org/es/reference/#/p5/blendMode
Pérez, A. (s.f.). Color Multiplication Exercise. Recuperado el 18 de junio de 2023, de https://andresrperez12.github.io/VisualComputing2022-2/docs/excercises/ColorMultiplicationExcercise/