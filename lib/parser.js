'use strict';
/*
 * Copyright (c) 2014 Mihai Alexandru Potra, All Rights Reserved.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public 
 * License along with this program.
 * If not, see [http://www.gnu.org/licenses/].
 */
var Stream = require('stream');
var Buffer = require('buffer').Buffer;

var Parser = module.exports = function Parser(/* source, options*/) {
  Stream.Writable.call(this);
  return this;
}

Parser.SRC_INVALID = '';
Parser.SRC_STRING = 'string';
Parser.SRC_BUFFER = 'buffer';
Parser.SRC_STREAM = 'stream';

Parser.prototype = Object.create(Stream.Writable.prototype);
Parser.prototype.data = null;

var getSourceType = function getSourceType(source) {
  if (source) {
    /* If argument is provided */
    if (typeof source === 'object') {
      if (Buffer.isBuffer(source)) {
        /* A Buffer source. */
        return Parser.SRC_BUFFER;
      } else if (source instanceof Stream && source.readable) {
        /* A Stream source. */
        return Parser.SRC_STREAM;
      }
    } else if (typeof source === 'string') {
      /* A String source. */
      return Parser.SRC_STRING;
    }
  }
  /* Any other type is not a valid source. */
  return Parser.SRC_INVALID;
}


Parser.prototype._write = function _write(chunk, encoding, callbackFinished) {
  if (!this.data) {
    this.data = [chunk];
  } else {
    this.data.push(chunk);
  }
  callbackFinished(); // chunk written.
}