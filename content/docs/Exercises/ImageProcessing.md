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

Is a sample within a data set identified for a particular purpose.[1] The concept of a ROI is commonly used in many application areas. For example, in medical imaging, the boundaries of a tumor may be defined on an image or in a volume, for the purpose of measuring its size. 


## Original Image

<img src="/showcase/docs/photomosaic/Lego.jpg" alt="SAvatar">

## Code

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