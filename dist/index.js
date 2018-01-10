(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("gl-matrix"));
	else if(typeof define === 'function' && define.amd)
		define(["gl-matrix"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("gl-matrix")) : factory(root["gl-matrix"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return gl.getShaderInfoLog(shader);
  }

  return shader;
}

exports.createShader = createShader;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function createShaderProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, fragmentShader);
  gl.attachShader(program, vertexShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return gl.getProgramInfoLog(program);
  }
  return program;
}

exports.createShaderProgram = createShaderProgram;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _shader = __webpack_require__(0);

Object.defineProperty(exports, 'createShader', {
    enumerable: true,
    get: function get() {
        return _shader.createShader;
    }
});

var _shader_program = __webpack_require__(1);

Object.defineProperty(exports, 'createShaderProgram', {
    enumerable: true,
    get: function get() {
        return _shader_program.createShaderProgram;
    }
});

var _sprite_batch = __webpack_require__(4);

Object.defineProperty(exports, 'createSpriteBatch', {
    enumerable: true,
    get: function get() {
        return _sprite_batch.createSpriteBatch;
    }
});
Object.defineProperty(exports, 'SpriteBatch', {
    enumerable: true,
    get: function get() {
        return _sprite_batch.SpriteBatch;
    }
});

var _texture = __webpack_require__(8);

Object.defineProperty(exports, 'createTexture', {
    enumerable: true,
    get: function get() {
        return _texture.createTexture;
    }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpriteBatch = exports.createSpriteBatch = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(5);

var _sprite_batch = __webpack_require__(6);

var _sprite_batch2 = _interopRequireDefault(_sprite_batch);

var _sprite_batch3 = __webpack_require__(7);

var _sprite_batch4 = _interopRequireDefault(_sprite_batch3);

var _shader = __webpack_require__(0);

var _shader_program = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var componentCount = 8;
var maxSpriteCount = 1024;
var fullTextureRegion = [0, 0, 1, 1];

var SpriteBatch = function () {
  function SpriteBatch(gl, program, uniforms, attributes, buffer, projView) {
    _classCallCheck(this, SpriteBatch);

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

  _createClass(SpriteBatch, [{
    key: 'begin',
    value: function begin() {
      var gl = this.gl;

      this.spriteCounter = 0;
      this.isRendering = true;

      gl.useProgram(this.program);
      gl.enableVertexAttribArray(this.attributes.color);
      gl.enableVertexAttribArray(this.attributes.position);
      gl.enableVertexAttribArray(this.attributes.texCoord);
    }
  }, {
    key: 'end',
    value: function end() {
      var gl = this.gl;

      this.flush();
      this.isRendering = false;

      gl.disableVertexAttribArray(this.attributes.color);
      gl.disableVertexAttribArray(this.attributes.position);
      gl.disableVertexAttribArray(this.attributes.texCoord);
    }
  }, {
    key: 'flush',
    value: function flush() {
      var _this = this;

      if (this.sprites.length > 0) {
        (function () {
          var gl = _this.gl,
              bufferData = _this.bufferData;


          var error = gl.getError();
          if (error !== gl.NO_ERROR) {
            throw new Error(error);
          }

          var _loop = function _loop(i) {
            var index = i * componentCount * 6;
            var offset = 0;

            var applyVertex = function applyVertex(sprite, x, y, tx, ty) {
              var finalIndex = index + offset * componentCount;
              bufferData[finalIndex] = x;
              bufferData[finalIndex + 1] = y;
              bufferData[finalIndex + 2] = tx;
              bufferData[finalIndex + 3] = ty;

              var _sprite$color = _slicedToArray(sprite.color, 4);

              bufferData[finalIndex + 4] = _sprite$color[0];
              bufferData[finalIndex + 5] = _sprite$color[1];
              bufferData[finalIndex + 6] = _sprite$color[2];
              bufferData[finalIndex + 7] = _sprite$color[3];

              offset += 1;
            };

            var sprite = _this.sprites[i];
            var x0 = sprite.x;
            var x1 = sprite.x + sprite.width;
            var y0 = sprite.y;
            var y1 = sprite.y + sprite.height;

            var _sprite$region = _slicedToArray(sprite.region, 4),
                tx0 = _sprite$region[0],
                ty0 = _sprite$region[1],
                tx1 = _sprite$region[2],
                ty1 = _sprite$region[3];

            applyVertex(sprite, x0, y0, tx0, ty0);
            applyVertex(sprite, x1, y0, tx1, ty0);
            applyVertex(sprite, x0, y1, tx0, ty1);
            applyVertex(sprite, x0, y1, tx0, ty1);
            applyVertex(sprite, x1, y1, tx1, ty1);
            applyVertex(sprite, x1, y0, tx1, ty0);
          };

          for (var i = 0; i < _this.spriteCounter; i += 1) {
            _loop(i);
          }

          gl.bindTexture(gl.TEXTURE_2D, _this.sprites[0].texture);
          gl.bindBuffer(gl.ARRAY_BUFFER, _this.buffer);
          gl.bufferData(gl.ARRAY_BUFFER, _this.bufferData, gl.STREAM_DRAW);

          var stride = 4 * componentCount;
          gl.vertexAttribPointer(_this.attributes.position, 2, gl.FLOAT, false, stride, 0 * 4);
          gl.vertexAttribPointer(_this.attributes.texCoord, 2, gl.FLOAT, false, stride, 2 * 4);
          gl.vertexAttribPointer(_this.attributes.color, 4, gl.FLOAT, false, stride, 4 * 4);
          gl.uniformMatrix4fv(_this.uniforms.projView, false, _this.projView);
          gl.drawArrays(gl.TRIANGLES, 0, 6);

          _this.spriteCounter = 0;
        })();
      }
    }
  }, {
    key: 'drawRegion',
    value: function drawRegion(texture, x, y, width, height, region) {
      if (!this.isRendering) {
        throw new Error('Call SpriteBatch.begin before beginning to render.');
      } else if ((this.currentTexture !== texture || this.sprites.length === maxSpriteCount) && this.sprites.length > 0) {
        this.flush();
      }

      if (this.spriteCounter >= this.sprites.length) {
        this.sprites.push({
          color: this.color,
          texture: texture,
          x: x,
          y: y,
          width: width,
          height: height,
          region: region
        });
      } else {
        var sprite = this.sprites[this.spriteCounter];
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
  }, {
    key: 'draw',
    value: function draw(texture, x, y, width, height) {
      this.drawRegion(texture, x, y, width, height, fullTextureRegion);
    }
  }, {
    key: 'resize',
    value: function resize(width, height) {
      this.projView = _glMatrix.mat4.ortho(this.projView, 0, width, height, 0, 0, 1);
    }
  }, {
    key: 'setColor',
    value: function setColor(rgba) {
      this.color = rgba;
    }
  }]);

  return SpriteBatch;
}();

function createSpriteBatch(gl, width, height) {
  var fragmentShader = (0, _shader.createShader)(gl, gl.FRAGMENT_SHADER, _sprite_batch2.default);
  var vertexShader = (0, _shader.createShader)(gl, gl.VERTEX_SHADER, _sprite_batch4.default);
  var program = (0, _shader_program.createShaderProgram)(gl, vertexShader, fragmentShader);

  var uniforms = {
    projView: gl.getUniformLocation(program, 'u_projView'),
    texture: gl.getUniformLocation(program, 'u_texture')
  };

  var attributes = {
    color: gl.getAttribLocation(program, 'color'),
    position: gl.getAttribLocation(program, 'position'),
    texCoord: gl.getAttribLocation(program, 'texCoord')
  };

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, maxSpriteCount * componentCount, gl.STREAM_DRAW);

  var projView = _glMatrix.mat4.ortho(_glMatrix.mat4.create(), 0, width, height, 0, 0, 1);

  return new SpriteBatch(gl, program, uniforms, attributes, buffer, projView);
}

exports.createSpriteBatch = createSpriteBatch;
exports.SpriteBatch = SpriteBatch;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "precision highp float;\nuniform sampler2D u_texture;\nvarying vec4 v_color;\nvarying vec2 v_texCoord;\n\nvoid main() {\n    vec4 texColor = texture2D(u_texture, v_texCoord);\n    gl_FragColor = v_color * texColor;\n}\n"

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "uniform mat4 u_projView;\nattribute vec4 color;\nattribute vec2 texCoord;\nattribute vec2 position;\nvarying vec4 v_color;\nvarying vec2 v_texCoord;\n\nvoid main() {\n    v_color = color;\n    v_texCoord = texCoord;\n    gl_Position = u_projView * vec4(position.xy, 0.0, 1.0);\n}\n"

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function isPowerOf2(value) {
  return (value & value - 1) === 0;
}

function createTexture(gl, data, width, height, options) {
  var texture = gl.createTexture();
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

  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}

exports.createTexture = createTexture;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map