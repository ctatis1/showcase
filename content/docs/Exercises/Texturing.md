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
# Code 
{{< details title="texturingShader.frag" open=true >}}
{{< highlight javascript >}}
precision mediump float;

varying vec4 color4;
varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform sampler2D vid0;

uniform bool inv;
uniform bool baw;
uniform bool cam;
uniform bool ten;
uniform bool elm;
uniform bool luz;
uniform bool hsl;
uniform vec2 mousePos;
uniform vec3 colT;
uniform float opc;

float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}



vec3 hslCol(vec3 texel){
  float Cmin =  min(min(texel.r,texel.g),texel.b);
  float Cmax =  max(max(texel.r,texel.g),texel.b);
  float delta = Cmax - Cmin;
  float H = 0.0 ,S = 0.0 ,L = 0.0 ;
  
  if(delta == 0.0){
    H = 0.0;
    S = 0.0;
  }else if(texel.r == Cmax){
    H = 60.0 * (mod(((texel.g-texel.b)/delta), 6.0));
  }else if(texel.g==Cmax){
    H = 60.0 * (((texel.b-texel.r)/delta) + 2.0);
  }else{
    H = 60.0 * (((texel.r-texel.g)/delta) + 4.0);
  }
  L = (Cmax + Cmin)/2.0;
  
  if(delta!=0.0){
    S = delta/(1.0-(2.0*L - 1.0 > 0.0 ? 2.0*L-1.0 : -(2.0*L-1.0)));
  }

  return vec3(H,S,L);
}

void main() {
  
  vec2 uv = vTexCoord;
  uv = vec2(uv.x,1.0-uv.y);
  vec4 tex;
  if(!cam){
      tex = texture2D(tex0, uv);
  }else{
      tex = texture2D(vid0, uv);
  }
  
  float pct = 0.0;
  pct = distance(vTexCoord,vec2(mousePos.x,1.0-mousePos.y));

  if(baw){
    tex = vec4((vec3(luma(tex.rgb))), opc);
  }else if(inv){
    tex = vec4(vec3(1.0) - tex.rgb, opc);
  }else if(ten){
    tex = vec4((tex.rgb*colT.rgb), opc);
  }else if(elm){
    tex = vec4(tex.rgb-colT.rgb, opc);
  }else if(hsl){
    tex = vec4(tex.rgb*color4.rgb, opc);
  }else if(luz){
    tex = vec4((tex.rgb+(0.5-vec3(pct))), 1.0);
  }else{
    tex = vec4(tex.rgb, opc);
  }
  gl_FragColor = tex;
}
{{< /highlight >}}
{{< /details >}} 

{{< details title="Color Blend" open=true >}}
{{< highlight javascript >}}
let Shader; let tex; let Binv = false, Bbaw = false, Bcam = false, Bten = false, Belm = false, Bhsl = false, Bluz = false; let c1, c2, c3, c4;

function preload(){ Shader = loadShader('/showcase/docs/texturing/texturingShader.vert', '/showcase/docs/texturing/texturingShader.frag'); tex = loadImage('/showcase/docs/texturing/mandrill.png'); }

function setup() { createCanvas(500, 500, WEBGL);

option = createSelect(); option.position(15, 5); 
option.option('Original'); 
option.option('Blanco y negro'); 
option.option('Invertir'); 
option.option('Teñido'); 
option.option('Eliminación'); 
option.option('Teñido 2'); 
option.option('Luz'); 
option.selected('Original'); 
option.changed(optionEvent);

colorPicker = createColorPicker('#ed225d'); 
colorPicker.position(15, 30);

//opacity = createSlider(0, 1, 1, 0.1); //opacity.position(80, 30); //opacity.style('width', '100px');

colorR = createButton('Randomize'); 
colorR.position(80, 30);
colorR.mousePressed(randomizeColor);

randomizeColor(); }

function draw() { shader(Shader); 
Shader.setUniform('tex0', tex); 
Shader.setUniform('inv', Binv); 
Shader.setUniform('baw', Bbaw); 
Shader.setUniform('ten', Bten); 
Shader.setUniform('elm', Belm); 
Shader.setUniform('luz', Bluz); 
Shader.setUniform('hsl', Bhsl); 
Shader.setUniform('mousePos', [mouseX/500,mouseY/500]); 
Shader.setUniform('colT', colorPicker.color()._array); 
Shader.setUniform('opc', 1); 
if(Bhsl){ 
    beginShape(); 
    fill(c1); 
    vertex(0, 0); 
    fill(c2); 
    vertex(0, 1); 
    fill(c3); 
    vertex(1, 1); 
    fill(c4); 
    vertex(1, 0); 
    endShape(); 
    } 
rect(0,0,width, height); }

function optionEvent() { 
    let opt = option.value(); 
    if(opt=="Original"){ 
        Bbaw = false; 
        Binv = false; 
        Bten = false; 
        Belm = false; 
        Bhsl = false; 
        Bluz = false; 
    }
    else if(opt=="Blanco y negro"){ 
        Bbaw = true; 
        Binv = false; 
        Bten = false; 
        Belm = false; 
        Bhsl = false; 
        Bluz = false; 
    }
    else if(opt=="Invertir"){ 
        Bbaw = false; 
        Binv = true; 
        Bten = false; 
        Belm = false; 
        Bhsl = false; 
        Bluz = false; 
    }
    else if(opt=="Teñido"){ 
        Bbaw = false; 
        Binv = false; 
        Bten = true; 
        Belm = false; 
        Bhsl = false; 
        Bluz = false; 
    }
    else if(opt=="Eliminación"){ 
        Bbaw = false; 
        Binv = false; 
        Bten = false; 
        Belm = true; 
        Bhsl = false; 
        Bluz = false; 
    }
    else if(opt=="Teñido 2"){ 
        Bbaw = false; 
        Binv = false; 
        Bten = false; 
        Belm = false; 
        Bhsl = true; 
        Bluz = false; 
    }
    else if(opt=="Luz"){
        Bbaw = false; 
        Binv = false; 
        Bten = false; 
        Belm = false; 
        Bhsl = false; 
        Bluz = true; 
    } 
}

function randomizeColor() { 
    c1 = [random(0,255),random(0,255),random(0,255)]; 
    c2 = [random(0,255),random(0,255),random(0,255)]; 
    c3 = [random(0,255),random(0,255),random(0,255)]; 
    c4 = [random(0,255),random(0,255),random(0,255)]; 
}
{{< /highlight >}}
{{< /details >}} 

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

# Conclusions


# References