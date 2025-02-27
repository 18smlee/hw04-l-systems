#version 300 es
precision highp float;

uniform vec3 u_Eye, u_Ref, u_Up;
uniform vec2 u_Dimensions;
uniform float u_Time;

in vec2 fs_Pos;
out vec4 out_Col;

//SETTINGS//
const float cloudscale = 1.0;
const float speed = 0.0003;
const float clouddark = 0.5;
const float cloudlight = 0.3;
const float cloudcover = 0.1;
const float cloudalpha = 3.0;
const float skytint = 0.7;
//SETTINGS//

const mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );

vec2 hash( vec2 p ) {
	p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p ) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
	vec2 i = floor(p + (p.x+p.y)*K1);	
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0); //vec2 of = 0.5 + 0.5*vec2(sign(a.x-a.y), sign(a.y-a.x));
    vec2 b = a - o + K2;
	vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
	vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    return dot(n, vec3(70.0));	
}

float fbm(vec2 n) {
	float total = 0.0, amplitude = 0.1;
	for (int i = 0; i < 7; i++) {
		total += noise(n) * amplitude;
		n = m * n;
		amplitude *= 0.4;
	}
	return total;
}

void main() {
  vec3 blue = vec3(93.0/255.0, 211.0/255.0, 254.0/255.0);
  vec3 darkBlue = vec3(0.0, 119.0/255.0, 163.0/255.0);
  vec3 skyCol = mix(darkBlue, blue, fs_Pos.y);

  vec2 p = fs_Pos;
	vec2 uv = fs_Pos;    
  float time = u_Time * speed;
  float q = fbm(uv * cloudscale * 0.5);
    
  //ridged noise shape
	float r = 0.0;
	uv *= cloudscale;
  uv -= q - time;
  float weight = 0.8;
  for (int i=0; i<8; i++){
  r += abs(weight*noise( uv ));
      uv = m*uv + time;
  weight *= 0.7;
  }
    
  //noise shape
	float f = 0.1;
  uv = fs_Pos;
	uv *= cloudscale;
  uv -= q - time;
  weight = 0.8;
  for (int i=0; i<5; i++){
    f += weight*noise( uv );
    uv = m*uv + time;
      weight *= 0.6;
  }
  
  f *= r + f;
  
  //noise colour
  float c = 0.0;
  time = u_Time * speed * 2.0;
  uv = fs_Pos;
  uv *= cloudscale*2.0;
  uv -= q - time;
  weight = 0.7;
  for (int i=0; i<7; i++){
    c += weight*noise( uv );
    uv = m*uv + time;
    weight *= 0.6;
  }
    
  //noise ridge colour
  float c1 = 0.0;
  time = u_Time * speed * 3.0;
  uv = fs_Pos;
  uv *= cloudscale * 3.0;
  uv -= q - time;
  weight = 0.4;
  for (int i=0; i<7; i++){
    c1 += abs(weight*noise( uv ));
    uv = m*uv + time;
    weight *= 0.6;
  }

  c += c1;
  
  vec3 cloudcolour = vec3(1.1, 1.1, 0.9) * clamp((clouddark + cloudlight*c), 0.0, 1.0);
  
  f = cloudcover + cloudalpha*f*r;
  
  vec3 result = mix(skyCol, clamp(skytint * skyCol + cloudcolour, 0.0, 1.0), clamp(f + c, 0.0, 1.0));

  out_Col = vec4(result, 1.0);
}
