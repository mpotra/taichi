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

var Compiler = module.exports = function Compiler() {
  Stream.Readable.call(this);
  return this;
}

Compiler.prototype = Object.create(Stream.Readable.prototype);
Compiler.prototype.data = null;

Compiler.prototype._read = function _read(n) {
  if (this.data && this.data.length) {
    var again = true;
    while(again) {
      again = this.push(this.data.shift());
    }
  } else {
    this.push(null); // Signal EOF;
  }
}