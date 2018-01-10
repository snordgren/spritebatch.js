import { mat4 } from 'gl-matrix';

import fragmentShaderSource from './sprite_batch.frag';
import vertexShaderSource from './sprite_batch.vert';
import { createShader } from './shader';
import { createShaderProgram } from './shader_program';

const componentCount = 8;
const maxSpriteCount = 1024;
const fullTextureRegion = [0, 0, 1, 1];

class SpriteBatch {
  constructor(gl, program, uniforms, attributes, buffer, projView) {
    this.gl = gl;
    this.program = program;
    this.uniforms = uniforms;
    this.attributes = attributes;
    this.buffer = buffer;
    this.bufferData = new Float32Array(componentCount * maxSpriteCount * 6);
    this.spriteCounter = 0;
    this.sprites = [];
    this.color = [1, 1, 1, 1];
    this.projView = projView;
  }

  begin() {
    const { gl } = this;
    this.spriteCounter = 0;
    this.isRendering = true;

    gl.useProgram(this.program);
    gl.enableVertexAttribArray(this.attributes.color);
    gl.enableVertexAttribArray(this.attributes.position);
    gl.enableVertexAttribArray(this.attributes.texCoord);
  }

  end() {
    const { gl } = this;
    this.flush();
    this.isRendering = false;

    gl.disableVertexAttribArray(this.attributes.color);
    gl.disableVertexAttribArray(this.attributes.position);
    gl.disableVertexAttribArray(this.attributes.texCoord);
  }

  flush() {
    if (this.sprites.length > 0) {
      const { gl, bufferData } = this;

      const error = gl.getError();
      if (error !== gl.NO_ERROR) {
        throw new Error(error);
      }

      for (let i = 0; i < this.spriteCounter; i += 1) {
        const index = i * componentCount * 6;
        let offset = 0;

        const applyVertex = (sprite, x, y, tx, ty) => {
          const finalIndex = index + offset * componentCount;
          bufferData[finalIndex] = x;
          bufferData[finalIndex + 1] = y;
          bufferData[finalIndex + 2] = tx;
          bufferData[finalIndex + 3] = ty;
          [bufferData[finalIndex + 4],
            bufferData[finalIndex + 5],
            bufferData[finalIndex + 6],
            bufferData[finalIndex + 7]] = sprite.color;
          offset += 1;
        };

        const sprite = this.sprites[i];
        const x0 = sprite.x;
        const x1 = sprite.x + sprite.width;
        const y0 = sprite.y;
        const y1 = sprite.y + sprite.height;
        const [tx0, ty0, tx1, ty1] = sprite.region;
        applyVertex(sprite, x0, y0, tx0, ty0);
        applyVertex(sprite, x1, y0, tx1, ty0);
        applyVertex(sprite, x0, y1, tx0, ty1);
        applyVertex(sprite, x0, y1, tx0, ty1);
        applyVertex(sprite, x1, y1, tx1, ty1);
        applyVertex(sprite, x1, y0, tx1, ty0);
      }

      gl.bindTexture(gl.TEXTURE_2D, this.sprites[0].texture);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.bufferData, gl.STREAM_DRAW);

      const stride = 4 * componentCount;
      gl.vertexAttribPointer(this.attributes.position, 2, gl.FLOAT, false, stride, 0 * 4);
      gl.vertexAttribPointer(this.attributes.texCoord, 2, gl.FLOAT, false, stride, 2 * 4);
      gl.vertexAttribPointer(this.attributes.color, 4, gl.FLOAT, false, stride, 4 * 4);
      gl.uniformMatrix4fv(this.uniforms.projView, false, this.projView);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      this.spriteCounter = 0;
    }
  }

  drawRegion(texture, x, y, width, height, region) {
    if (!this.isRendering) {
      throw new Error('Call SpriteBatch.begin before beginning to render.');
    } else if ((this.currentTexture !== texture || this.sprites.length === maxSpriteCount)
      && this.sprites.length > 0) {
      this.flush();
    }

    if (this.spriteCounter >= this.sprites.length) {
      this.sprites.push({
        color: this.color,
        texture,
        x,
        y,
        width,
        height,
        region,
      });
    } else {
      const sprite = this.sprites[this.spriteCounter];
      sprite.color = this.color;
      sprite.texture = texture;
      sprite.x = x;
      sprite.y = y;
      sprite.width = width;
      sprite.height = height;
      sprite.region = region;
    }

    this.spriteCounter += 1;
  }

  draw(texture, x, y, width, height) {
    this.drawRegion(texture, x, y, width, height, fullTextureRegion);
  }

  resize(width, height) {
    this.projView = mat4.ortho(this.projView, 0, width, height, 0, 0, 1);
  }

  setColor(rgba) {
    this.color = rgba;
  }
}

function createSpriteBatch(gl, width, height) {
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const program = createShaderProgram(gl, vertexShader, fragmentShader);

  const uniforms = {
    projView: gl.getUniformLocation(program, 'u_projView'),
    texture: gl.getUniformLocation(program, 'u_texture'),
  };

  const attributes = {
    color: gl.getAttribLocation(program, 'color'),
    position: gl.getAttribLocation(program, 'position'),
    texCoord: gl.getAttribLocation(program, 'texCoord'),
  };

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, maxSpriteCount * componentCount, gl.STREAM_DRAW);

  const projView = mat4.ortho(mat4.create(), 0, width, height, 0, 0, 1);

  return new SpriteBatch(gl, program, uniforms, attributes, buffer, projView);
}

export {
  createSpriteBatch,
  SpriteBatch,
};
