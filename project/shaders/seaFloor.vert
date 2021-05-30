attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;
uniform float maxZ;
uniform float offset;

void main() {
	vTextureCoord = aTextureCoord;

	vec3 pos = aVertexPosition + vec3(0, 0, texture2D(uSampler2, vTextureCoord).g * offset - offset * 0.4);
	
	if (pos.y > 1.0) {pos.y = 1.0;}


	gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);

}

