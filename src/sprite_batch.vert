uniform mat4 u_projView;
attribute vec4 color;
attribute vec2 texCoord;
attribute vec2 position;
varying vec4 v_color;
varying vec2 v_texCoord;

void main() {
    v_color = color;
    v_texCoord = texCoord;
    gl_Position = u_projView * vec4(position.xy, 0.0, 1.0);
}
