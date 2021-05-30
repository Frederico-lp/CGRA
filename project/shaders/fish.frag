#version 300 es
precision highp float;

in vec4 vFinalColor;
in vec2 vTextureCoord;

out vec4 fragColor;

uniform sampler2D uSampler;

in vec4 coords;

uniform bool uUseTexture;
uniform vec3 color;

void main() {
	// Branching should be reduced to a minimal. 
	// When based on a non-changing uniform, it is usually optimized.
    vec4 textureColor = texture(uSampler, vTextureCoord);
    if(coords.z < 0.025){
        vec4 textureColor = texture(uSampler, vTextureCoord);
        fragColor = textureColor * vFinalColor;
    }
    else 
        fragColor = vFinalColor * vec4(color, 1.0);


}
