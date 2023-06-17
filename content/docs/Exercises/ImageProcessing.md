# Exercise Photomosaic

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

### Kernel

In image processing, a kernel, convolution matrix, or mask is a small matrix used for blurring, sharpening, embossing, edge detection, and more. This is accomplished by doing a convolution between the kernel and an image. Or more simply, when each pixel in the output image is a function of the nearby pixels (including itself) in the input image, the kernel is that function.

## Original Image

## Code

{{< p5-global-iframe lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="680" height="680" >}} 
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
  maskShader = readShader('/showcase/docs/imageProcessing/mask.frag',
                        { varyings: Tree.texcoords2 });
  // Load image and video files
  img = loadImage('/showcase/docs/imageProcessing/Lego.jpg');
}

function setup() {
  createCanvas(640, 640, WEBGL);
  noStroke();
  // Set up video and hide it HTML element
  vid.hide();
  vid.loop();
  // Set up the shader
  textureMode(NORMAL);
  shader(maskShader);
  // Set up the checkboxes and slider
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
  // Masl selector
  sel = createSelect();
  sel.position(500,10);
  sel.option('Gaussian blur');
  sel.option('Sharpening');
  sel.option('Edges');
  sel.option('Emboss');
  sel.input(uniformUpdate);
  // Initialize mask
  uniformUpdate();
  
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
  // Send mouse position and radius in every frame
  maskShader.setUniform('mouse', [mouseX/width, mouseY/height]);
  maskShader.setUniform('actionRadius', radius_slider.value()/100.0);
}

function uniformUpdate(){
  // Mask application
  maskShader.setUniform('apply_mask',mask_checkbox.checked());
  // Luma application
  maskShader.setUniform('luma',luma_checkbox.checked());
  // Mask selection
  if( sel.value() == 'Gaussian blur' ){
    maskShader.setUniform('mask', [1.0/16.0,2.0/16.0,1.0/16.0, 2.0/16.0,4.0/16.0,2.0/16.0, 1.0/16.0,2.0/16.0,1.0/16.0]);
  }else if( sel.value() == 'Sharpening' ){
    maskShader.setUniform('mask', [0.0,-1.0,0.0, -1.0,5.0,-1.0, 0.0,-1.0,0.0]);
  }else if( sel.value() == 'Edges' ){
    maskShader.setUniform('mask', [-1.0,-1.0,-1.0, -1.0,8.0,-1.0, -1.0,-1.0,-1.0,]);
  }else if( sel.value() == 'Emboss' ){
    maskShader.setUniform('mask', [-2.0,-1.0,0.0, -1.0,1.0,1.0, 0.0,1.0,2.0]);
  }
  // Region of interest
  maskShader.setUniform('roi',roi_checkbox.checked());
  // Magnifier
  maskShader.setUniform('magnifier',magnifier_checkbox.checked());
}
{{< /p5-global-iframe >}}

## References
* [Kernel (image processing)](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29)
* [Implementing Photomosaics](https://www.geeksforgeeks.org/implementing-photomosaics/) by GeeksForGeeks
* [Archives of sample photos for photomosaic -Archive with christmas images.](https://www.artensoft.com/ArtensoftPhotoMosaicWizard/photobases.php) by Artensoft