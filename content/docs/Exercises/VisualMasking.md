# Exercise Moiré Patterns and Kinegrams 

{{< hint info >}}
**Exercise 3**  
Implement a kinegram and some moiré patterns which are close related visual phenomena to masking.
{{< /hint >}}

# Introduction
## Moiré Pattern

"‘ Moiré ’ is a French word meaning a silk fabric that has been subjected to heat and pressure rollers after weaving to give it a rippled appearance.

The “Moiré Pattern” is an interference pattern produced by placing the similar templates , slightly offset by spacing or angle." 

## Kinegram

"The Kinegrams artfully combine the visual effects of moiré patterns with the zoetrope animation technique."

# Solution
In order to

# Code
{{< details title="Kinegram" open=true >}}
{{< highlight javascript >}}
function setup() {
  createCanvas(720, 560);
}

function draw() {
  background(220)
  for (let j = 0; j <1000; j+=7){
    
    stroke(0)
    strokeWeight(3)
    line( 0, j+mouseY,width, j+ mouseY)
    stroke('cyan')
    strokeWeight(3)
    noFill()
    ellipse(j, 100, 100, 100)
    stroke('blue')
    strokeWeight(3)
    noFill()
    ellipse(j, 200, 100, 100)
    stroke('magenta')
    strokeWeight(3)
    noFill()
    ellipse(j, 300, 100, 100)
    stroke('yellow')
    strokeWeight(3)
    noFill()
    ellipse(j, 400, 100, 100)
    stroke('green')
    strokeWeight(3)
    noFill()
    ellipse(j, 500, 100, 100)
  }
}
{{< /highlight >}}
{{< /details >}} 
 {{< p5-global-iframe id="breath" width="700" height="550" >}} function setup() { createCanvas(720, 500); }

function setup() {
  createCanvas(720, 560);
}

function draw() {
  background(220)
  for (let j = 0; j <1000; j+=7){
    
    stroke(0)
    strokeWeight(3)
    line( 0, j+mouseY,width, j+ mouseY)
    stroke('cyan')
    strokeWeight(3)
    noFill()
    ellipse(j, 100, 100, 100)
    stroke('blue')
    strokeWeight(3)
    noFill()
    ellipse(j, 200, 100, 100)
    stroke('magenta')
    strokeWeight(3)
    noFill()
    ellipse(j, 300, 100, 100)
    stroke('yellow')
    strokeWeight(3)
    noFill()
    ellipse(j, 400, 100, 100)
    stroke('green')
    strokeWeight(3)
    noFill()
    ellipse(j, 500, 100, 100)
  }
} 
{{< /p5-global-iframe >}}


# Conclusions
Kinegrams and Moiré patterns are useful in arts and animation and can generate interesting effects.

# References
* Kinegrams https://www.giannisarcone.com/Kinegrams.html by G. Sarcone
* Moiré Pattern and code https://naziafakhruddin.medium.com/the-mysterious-moiré-pattern-49d797897355
