#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {

	vec4 bumpMapColor = texture2D(uSampler2, vTextureCoord + 0.001 * timeFactor);

    float offset_s = 0.2 * bumpMapColor.r - 0.1;
    float offset_t = 0.2 * bumpMapColor.g - 0.1;
	
    vec2 offset = vTextureCoord + vec2(offset_s, offset_t);

    if (offset.x > 1.0) {offset.x = 0.99;} 
    if (offset.x < 0.0) {offset.x = 0.01;}
    if (offset.y > 1.0) {offset.y = 0.99;} 
    if (offset.y < 0.0) {offset.y = 0.01;}

    vec4 textureColor = texture2D(uSampler, offset);


	gl_FragColor = textureColor;
}
