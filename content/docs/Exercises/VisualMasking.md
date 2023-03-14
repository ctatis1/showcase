# Exercise Moiré Patterns and Kinegrams 

{{< hint info >}}
**Exercise 3**  
Implement a kinegram and some moiré patterns which are close related visual phenomena to masking.
{{< /hint >}}

# Moiré Pattern

"‘ Moiré ’ is a French word meaning a silk fabric that has been subjected to heat and pressure rollers after weaving to give it a rippled appearance.

The “Moiré Pattern” is an interference pattern produced by placing the similar templates , slightly offset by spacing or angle." 

# Kinegram

"The Kinegrams artfully combine the visual effects of moiré patterns with the zoetrope animation technique."

{{< /highlight >}}
{{< /details >}}

{{< p5-global-iframe id="breath" width="600" height="400" >}}

function draw() {
 background(220)
  for (let j = 0; j <1000; j += 7) {
  
    stroke(0)
    strokeWeight(3)
    line(j + mouseX, 0, j + mouseX, height)

    stroke('yellow')
    strokeWeight(3)
    noFill()
    ellipse(100, j, 100, 100)
    stroke('turquoise')
    ellipse(200, j, 100, 100)
    stroke('coral')
    ellipse(300, j, 100, 100)
    stroke('pink')
    ellipse(400, j, 100, 100)
    stroke(0,255,0)
    ellipse(500, j, 100, 100)
    stroke(255)
    ellipse(600, j, 100, 100)   
 
  }
}
{{< /p5-global-iframe >}}

# Conclusions
Kinegrams and Moiré patterns are useful in arts and animation and can generate interesting effects.

# References
* Kinegrams https://www.giannisarcone.com/Kinegrams.html by G. Sarcone
* Moiré Pattern and code https://naziafakhruddin.medium.com/the-mysterious-moiré-pattern-49d797897355
