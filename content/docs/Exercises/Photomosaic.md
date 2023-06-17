# Exercise Photomosaic

{{< hint info >}}
**Exercise 4**  
Implement a mosaic visual application.
{{< /hint >}}

## Background Information

### Photomosaic

A photomosaic is a photo composed of a collection of images arranged in such a way as to present a larger image. This larger image consists of a two-dimensional array or matrix of other smaller images, which when viewed from close up you can see each of the photos and when viewed from a distance all of the small composite images form a photo.

At Fotomosaico we can use your digital photos to create a larger photo that when viewed up close you will be able to appreciate your entire photo collection.

We can create a photomosaic for any application you need, our company has worked to create posters, postcards, magazine covers to large spectacular.

### How to create Photomosaics?

1. Read the images from the dataset, which will replace the squares of the original image.
2. Read the original image and divide it into M x N squares forming the mosaic.
3. For each frame, find the best match of the images in the dataset.
4. Create the final photomosaic by arranging the selected dataset images.

### Splitting the images into tiles

Now let’s look at how to calculate the coordinates for a single tile from this grid. The tile with index (i, j) has a top-left corner coordinate of (i*w, i*j) and a bottom-right corner coordinate of ((i+1)*w, (j+1)*h), where w and h stand for the width and height of a tile, respectively. These can be used with the PIL to crop and create a tile from this image.

<img src="https://media.geeksforgeeks.org/wp-content/uploads/Capture_2-1.jpg" alt="Splitting images into tiles">

## Image and Dataset

### Original Image

<img src="/showcase/docs/photomosaic/assets/Lego.jpg" alt="SAvatar">

### Dataset

<img src="/showcase/docs/photomosaic/assets/dataset.png" alt="SAvatar">

## Code

### Photomosaic
{{< details title="Photomosaic" open=false >}} {{< highlight javascript >}} 
{{% include "/showcase/docs/photomosaic/photomosaic.js" %}}
{{< /highlight >}} {{< /details >}}


{{< p5-iframe sketch="/showcase/docs/photomosaic/photomosaic.js" width="625" height="625">}}


## References
* [DISEÑO DE FOTOMOSAICO](https://fotomosaico.com/diseno-fotomosaico) by Fotomosaico®
* [Implementing Photomosaics](https://www.geeksforgeeks.org/implementing-photomosaics/) by GeeksForGeeks
* [Archives of sample photos for photomosaic -Archive with christmas images.](https://www.artensoft.com/ArtensoftPhotoMosaicWizard/photobases.php) by Artensoft