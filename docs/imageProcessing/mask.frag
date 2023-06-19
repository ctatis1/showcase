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