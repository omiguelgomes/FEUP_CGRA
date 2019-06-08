attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float timeFactor;

void main() {
	// vec2 anim = vec2(timeFactor, timeFactor);
	vec4 filter = texture2D(uSampler2, vec2(0.0,0.1)+aTextureCoord); //anim+
	float offset = (filter.r + filter.g + filter.b) * 4.0;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xy,aVertexPosition.z+offset, 1.0);

	vTextureCoord = aTextureCoord;
}