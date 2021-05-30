#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec4 textureColor = texture2D(uSampler, vTextureCoord);
	vec4 bumpMapColor = texture2D(uSampler2, vTextureCoord);

	gl_FragColor = vec4(vec3(textureColor * bumpMapColor), 1.0);
}


