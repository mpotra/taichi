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

var Parser = require('./parser');
var Compiler = require('./compiler');

var Engine = module.exports = function Engine() {
  Stream.Transform.call(this);
  this.parser = new Parser();
  this.compiler = new Compiler();
  return this;
}

Engine.prototype = Object.create(Stream.Transform.prototype);

Engine.prototype._transform = function _transform(chunk, encoding, callbackFinished) {
  var self = this;
  this.parser.write(chunk, encoding, function (err) {
    callbackFinished(err);
  });
}

Engine.prototype._flush = function _flush(callbackFinished) {
  var self = this;
  this.compiler.data = this.parser.data;
  this.compiler.on('data', function(chunk) {
    self.push(chunk);
  });
  this.compiler.on('end', function() {
    self.push(null); // signal EOF.
    callbackFinished();
  });
}

Engine.prototype.from = function from(parseType) {
  return this;
}

Engine.prototype.to = function to(compileType) {
  return this;
}