attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;	//model view
uniform mat4 uPMatrix;	//projection
uniform mat4 uNMatrix;	//normal 

varying float y;

void main() {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	y = gl_Position.y;
}

