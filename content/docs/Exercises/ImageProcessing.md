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

### Kernel

In image processing, a kernel, convolution matrix, or mask is a small matrix used for blurring, sharpening, embossing, edge detection, and more. This is accomplished by doing a convolution between the kernel and an image. Or more simply, when each pixel in the output image is a function of the nearby pixels (including itself) in the input image, the kernel is that function.

* Ridges or edge detection: is the attempt, via software, to locate ridges in an image, defined as curves whose points are local maxima of the function, akin to geographical ridges.
* Identity: is a function that always returns the value that was used as its argument, unchanged. 
* Gaussian Blur 3x3: a Gaussian blur (also known as Gaussian smoothing) is the result of blurring an image by a Gaussian function. It is a widely used effect in graphics software, typically to reduce image noise and reduce detail. 

<img src="/showcase/docs/imageProcessing/kernel.png" alt="kernel">

### Region of Interest (ROI)




## Original Image

## Code

{{< p5-global-iframe lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="780" height="680" >}} 
let uvShader;
let img;
let inputColor; 

function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/showcase/docs/imageProcessing/mask.frag',
                        {varyings: Tree.texcoords2 });
  img = loadImage("https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/c8cb366d52fc2a67fb313c344efdbc9e.png");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(580,670, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(uvShader);
  uvShader.setUniform("texture",img);
  uvShader.setUniform("iResolution",[650,800]);
}

//uniform vec2 iMouse;
//uniform vec2 iResolution;
//uniform vec2 texcoords2;
//uniform sampler2D texture;

function draw() {
  background(0);
  uvShader.setUniform("iMouse",[mouseX,mouseY]);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
      width / 2, height / 2, -width / 2, height / 2);
}
{{< /p5-global-iframe >}}

## References
* [Kernel (image processing)](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29)
* [Implementing Photomosaics](https://www.geeksforgeeks.org/implementing-photomosaics/) by GeeksForGeeks
* [Archives of sample photos for photomosaic -Archive with christmas images.](https://www.artensoft.com/ArtensoftPhotoMosaicWizard/photobases.php) by Artensoft