/**
 * Create a new shader program.
 * 
 * @param {WebGLRenderingContext} gl The WebGL context to use for creating the shader program.
 * @param {WebGLShader} vertexShader The compiled vertex shader.
 * @param {WebGLShader} fragmentShader The compiled fragment shader.
 * @deprecated use twgl.js instead
 */
function createShaderProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, fragmentShader);
  gl.attachShader(program, vertexShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return gl.getProgramInfoLog(program);
  }
  return program;
}

export {
  createShaderProgram,
};
