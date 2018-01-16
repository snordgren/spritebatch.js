/**
 * @deprecated use twgl.js instead
 */
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return gl.getShaderInfoLog(shader);
  }

  return shader;
}

export {
  createShader,
};
