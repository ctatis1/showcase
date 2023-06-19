# Exercise Image Processing

{{< hint info >}}
**Exercise 5**  
Exercise
Implement an image / video processing app supporting different masks, including other kernel sizes different than 3x3, and:
* A region-of-interest base tool to selectively apply a given mask.Hint: circular regions around the mouse pointer are handy and quite simple to implement by means of glsl distance.
* A magnifier tool. Requires a bit of research. For instance, look for it in shadertoy.
* Integrate luma and other coloring brightness tools.
What other shader tools would you implement?
{{< /hint >}}

## Background Information

### Convolution Matrix

In image processing, a kernel, convolution matrix, or mask is a small matrix used for blurring, sharpening, embossing, edge detection, and more. This is accomplished by doing a convolution between the kernel and an image. Or more simply, when each pixel in the output image is a function of the nearby pixels (including itself) in the input image, the kernel is that function.

* Ridges or edge detection: is the attempt, via software, to locate ridges in an image, defined as curves whose points are local maxima of the function, akin to geographical ridges.
* Identity: is a function that always returns the value that was used as its argument, unchanged. 
* Gaussian Blur 3x3: a Gaussian blur (also known as Gaussian smoothing) is the result of blurring an image by a Gaussian function. It is a widely used effect in graphics software, typically to reduce image noise and reduce detail. 

<img src="/showcase/docs/imageProcessing/kernel.png" alt="kernel">

### Region of Interest (ROI)

Is a sample within a data set identified for a particular purpose. The concept of a ROI is commonly used in many application areas. For example, in medical imaging, the boundaries of a tumor may be defined on an image or in a volume, for the purpose of measuring its size. 

### Luma

Represents the brightness in an image (the "black-and-white" or achromatic portion of the image). Luma is typically paired with chrominance. Luma represents the achromatic image, while the chroma components represent the color information. Converting R′G′B′ sources (such as the output of a three-CCD camera) into luma and chroma allows for chroma subsampling: because human vision has finer spatial sensitivity to luminance ("black and white") differences than chromatic differences, video systems can store and transmit chromatic information at lower resolution, optimizing perceived detail at a particular bandwidth.

## Original Image

<img src="/showcase/docs/photomosaic/Lego.jpg" alt="SAvatar">

## Code

{{< details title="Photomosaic.frag" open=false >}} {{< highlight javascript >}} 
uniform sampler2D texture;
uniform vec2 texOffset;
uniform vec2 mouseAction;
uniform float mask[9];
uniform bool apply_mask;
uniform bool luma;
uniform bool roi;
uniform bool magnifier;
uniform float actionRadius;

precision mediump float;
const float Zoom = 2.0;
varying vec2 texcoords2;

float lumaFunction(vec3 texel) {
  return (texel.r*0.299) + (texel.g*0.587) + (texel.b*0.114);
}

vec4 magnifiedTexture(sampler2D currTexture, vec2 point){
  if(magnifier && distance(point,mouseAction) <= actionRadius){
    vec2 centerVector = point-mouseAction;
    centerVector = (1.0/Zoom) * centerVector;
    return texture2D(currTexture,mouseAction+centerVector);
  }
  return texture2D(currTexture,point);
}

void main() {
  if(apply_mask && (roi==false || distance(texcoords2,mouseAction)<=actionRadius)){
    vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
    vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
    vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  
    vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
    vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
    vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
    vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
    vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

    vec4 rgba[9];
    rgba[0] = magnifiedTexture(texture, tc0);
    rgba[1] = magnifiedTexture(texture, tc1);
    rgba[2] = magnifiedTexture(texture, tc2);
    rgba[3] = magnifiedTexture(texture, tc3);
    rgba[4] = magnifiedTexture(texture, tc4);
    rgba[5] = magnifiedTexture(texture, tc5);
    rgba[6] = magnifiedTexture(texture, tc6);
    rgba[7] = magnifiedTexture(texture, tc7);
    rgba[8] = magnifiedTexture(texture, tc8);
  
    vec4 convolution = vec4(0.0,0.0,0.0,0.0);

    for (int i=0; i<9; i++) {
      convolution += rgba[i]*mask[i];
    }
    gl_FragColor = vec4(convolution.rgb, 1.0); 
  }else{
    gl_FragColor = magnifiedTexture(texture, texcoords2);
  }

  if(luma){
    gl_FragColor = vec4((vec3(lumaFunction(gl_FragColor.rgb))), 1.0);
  }
}
{{< /highlight >}} {{< /details >}}
{{< details title="Photomosaic" open=false >}} {{< highlight javascript >}} 
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
{{< /highlight >}} {{< /details >}}

{{< p5-global-iframe lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="680" height="680" >}} 
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.js"></script>
<script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js"></script>
<script src="/showcase/docs/imageProcessing/imageProcessing.js"></script> 

{{< /p5-global-iframe >}}

## References
* [Kernel (image processing)](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29)
* [Implementing Photomosaics](https://www.geeksforgeeks.org/implementing-photomosaics/) by GeeksForGeeks
* [Archives of sample photos for photomosaic -Archive with christmas images.](https://www.artensoft.com/ArtensoftPhotoMosaicWizard/photobases.php) by Artensoft