# Exercise Color Models 

{{< hint info >}}
**Exercise 1**  
Research other color models such as HSL, HSB, XYZ.
{{< /hint >}}

# What is a colour model?

Computers understand binary language i.e. 0s and 1s. Colours are also 0s and 1s inside a computer. But while designing anything digital you do not tell the computer that hey, I want to use 01011101 colour. Obviously, we do not use the binary code. Here we use a colour model to specify a colour in terms of some parameters which in turn will send the 0’s and 1’s to the display and tell it what colour has to be shown for each desired pixel.

Putting it simply, a colour model is a system to represent a colour.

# HSB Model

So there is this other model out there which deals with the Hue (H), Saturation (S) and Brightness (B).

In this model, a colour can be represented by the hue it carries, how much saturated it is and the brightness it has. The H(ue) parameter takes value from 0 to 360, whereas the S(aturation) and B(rightness) parameters take value from 0 to 100. This model is also alternatively known as HSV where V stands for Value and ranges from 0 to 100.

If we look at the combinations here:
* At the centre of the base — Saturation is 0 while the Brightness is 100 which gives us the colour — White irrespective of the hue.
* On the opposite side — at the tip of the cone, Saturation is 0 and the Brightness is 0 too which gives us the colour — Black irrespective of the Hue.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*k1D1V6DjXS3yVurvpGbNSw.png" alt="HSB Color Model">

# HSL Model

The HSL representation models the way different paints mix together to create color in the real world, with the lightness dimension resembling the varying amounts of black or white paint in the mixture. Fully saturated colors are placed around a circle at a lightness value of ½, with a lightness value of 0 or 1 corresponding to fully black or white, respectively.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Hsl-hsv_models.svg/600px-Hsl-hsv_models.svg.png" alt="HSV & HSL comparison">

# XYZ Model

The X-value in this model represents approximately the red/green part of a color, the Y-value represents approximately the lightness and the Z-value corresponds roughly to the blue/yellow part. The X value accepts values from 0 to 95.047, the Y-value values from 0 to 100 and the Z-value values between 0 and 108.883.

In addition to these color values X, Y and Z, also color value proportions can be specified. These are written in lowercase and called x, y and z and they are calculated as follows:

* x = X/(X+Y+Z)
* y = Y/(X+Y+Z)
* z = Z/(X+Y+Z)

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/CIExy1931.png/300px-CIExy1931.png" alt="XYZ Color Model">

# Conclusions

Besides what everyone might think, there are many more color models than just RGB that fits better depending on the goals of the project the organization/team wants to develop. The differences between them are not significant in general but in particular scenarios it does. Knowing them allow you to develop a higher criteria and focus on what you need. 

## References
* [RGB vs HSB vs HSL — Demystified](https://medium.com/innovaccer-design/rgb-vs-hsb-vs-hsl-demystified-1992d7273d3a) by Anagh Sharma
* [HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)
* [XYZ / CIE Color Spaces](https://www.sttmedia.com/colormodel-xyz) by Stefan Trost Media
