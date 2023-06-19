# Texturing

{{< hint info >}}
Implement other coloring brightness tools such as HSV value V, HSL lightness L or Component average.
{{< /hint >}}

# Introduction
This exercise seeks to generate different textures through the manipulation of each one of the pixels of the image using shaders. In this way, it seeks to generate the following textures

## LUMA
Luma represents the brightness in an image (the "black-and-white" or achromatic portion of the image). Luma is typically paired with chrominance. Luma represents the achromatic image, while the chroma components represent the color information.

## Inverse
To generate the inverse of a color, it is necessary to find its complementary color, which is obtained by subtracting 100 from the values ​​of red, green, and blue.

## Tinted 

In this case, a layer of the color with which you want to tint the image is generated. Subsequently, each pixel of the image is multiplied with that of the layer of the chosen color.

## Elimination

In this texture, the entire color to be removed is eliminated in the RGB value of each pixel.

## Interpolated Tinted
In this case, what was done was to generate a base texture with which the target texture was going to be tinted. This base texture was created by means of a square in which each of its tips had a different color and a gradient was generated. between each one of the colors to reach the others, then in the same way as in the case of the first dyeing, the rgb components of the target dyeing were multiplied by their corresponding rgb component but this time not of a single dyeing color but of rgb of the corresponding pixel in the base texture.
## Spotlight

This last texture is made using light tones and is more noticeable in the parts closest to the cursor.

{{< p5-global-iframe id="pyramid" width="525" height="525" >}}

let Shader; let tex; let Binv = false, Bbaw = false, Bcam = false, Bten = false, Belm = false, Bhsl = false, Bluz = false; let c1, c2, c3, c4;

function preload(){ Shader = loadShader('/showcase/docs/texturing/texturingShader.vert', '/showcase/docs/texturing/texturingShader.frag'); tex = loadImage('/showcase/docs/texturing/mandrill.png'); }

function setup() { createCanvas(500, 500, WEBGL);

option = createSelect(); option.position(15, 5); option.option('Original'); option.option('Blanco y negro'); option.option('Invertir'); option.option('Teñido'); option.option('Eliminación'); option.option('Teñido 2'); option.option('Luz'); option.selected('Original'); option.changed(optionEvent);

colorPicker = createColorPicker('#ed225d'); colorPicker.position(15, 30);

//opacity = createSlider(0, 1, 1, 0.1); //opacity.position(80, 30); //opacity.style('width', '100px');

colorR = createButton('Randomize'); colorR.position(80, 30); colorR.mousePressed(randomizeColor);

randomizeColor(); }

function draw() { shader(Shader); Shader.setUniform('tex0', tex); Shader.setUniform('inv', Binv); Shader.setUniform('baw', Bbaw); Shader.setUniform('ten', Bten); Shader.setUniform('elm', Belm); Shader.setUniform('luz', Bluz); Shader.setUniform('hsl', Bhsl); Shader.setUniform('mousePos', [mouseX/500,mouseY/500]); Shader.setUniform('colT', colorPicker.color()._array); Shader.setUniform('opc', 1); if(Bhsl){ beginShape(); fill(c1); vertex(0, 0); fill(c2); vertex(0, 1); fill(c3); vertex(1, 1); fill(c4); vertex(1, 0); endShape(); } rect(0,0,width, height); }

function optionEvent() { let opt = option.value(); if(opt=="Original"){ Bbaw = false; Binv = false; Bten = false; Belm = false; Bhsl = false; Bluz = false; }else if(opt=="Blanco y negro"){ Bbaw = true; Binv = false; Bten = false; Belm = false; Bhsl = false; Bluz = false; }else if(opt=="Invertir"){ Bbaw = false; Binv = true; Bten = false; Belm = false; Bhsl = false; Bluz = false; }else if(opt=="Teñido"){ Bbaw = false; Binv = false; Bten = true; Belm = false; Bhsl = false; Bluz = false; }else if(opt=="Eliminación"){ Bbaw = false; Binv = false; Bten = false; Belm = true; Bhsl = false; Bluz = false; }else if(opt=="Teñido 2"){ Bbaw = false; Binv = false; Bten = false; Belm = false; Bhsl = true; Bluz = false; }else if(opt=="Luz"){ Bbaw = false; Binv = false; Bten = false; Belm = false; Bhsl = false; Bluz = true; } }

function randomizeColor() { c1 = [random(0,255),random(0,255),random(0,255)]; c2 = [random(0,255),random(0,255),random(0,255)]; c3 = [random(0,255),random(0,255),random(0,255)]; c4 = [random(0,255),random(0,255),random(0,255)]; }

{{< /p5-global-iframe >}}