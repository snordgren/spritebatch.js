function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}

/**
 * Apply a set of options to a currently bound texture. This is an internal function for
 * use by createTexture and loadTexture.
 * @deprecated use twgl.js instead
 */
function applyTextureOpts(gl, options) {
  if (options.magFilter) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, options.magFilter);
  }

  if (options.minFilter) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, options.minFilter);
  }

  if (options.wrapS) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, options.wrapS);
  }

  if (options.wrapT) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, options.wrapT);
  }
}

/**
 * Create a new texture from an Uint8Array.
 * @deprecated use twgl.js instead
 */
function createTexture(gl, data, width, height, options) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);

  if (isPowerOf2(width) && isPowerOf2(height)) {
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  if (options) {
    applyTextureOpts(gl, options);
  }
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}

/**
 * Load a new texture from a URL.
 * @deprecated use twgl.js instead
 */
function loadTexture(gl, url, callback) {
  const image = new Image();
  image.onload = () => {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
    callback(texture);
  };
  image.src = url;
}

export {
  createTexture,
  loadTexture
};
