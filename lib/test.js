const tape = require('tape');
const Test = tape.Test.prototype;

module.exports = tape;

Test.shouldResolve
  = Test.resolves
  = function(promise, msg = 'promise should resolve', msg2 = 'should be a promise') {
    const self = this;

    if (!isPromise(promise)) {
      return self.fail(msg2);
    }

    return promise.then(
      function resolves(value) {
        self.pass(msg);
        return value;
      },
      function rejects(err) {
        self.doesNotThrow(() => { throw err; }, msg);
      }
    );
  };

Test.shouldResolveTo
  = Test.resolvesTo
  = function(promise, expected, msg = 'promise should with expected value', msg2 = 'should be a promise') {
    const self = this;

    if (!isPromise(promise)) {
      return self.fail(msg2);
    }

    return promise.then(
      function resolves(value) {
        self.looseEqual(value, expected, msg);
        return value;
      },
      function rejects(err) {
        self.doesNotThrow(() => { throw err; }, msg);
      }
    );
  };

Test.shouldReject
  = Test.rejects
  = function(promise, msg = 'promise should reject', msg2 = 'should be a promise') {
    const self = this;

    if (!isPromise(promise)) {
      return self.fail(msg2);
    }

    return promise.then(
      function resolves(value) {
        self.fail(msg);
      },
      function rejects(err) {
        self.throws(() => { throw err; }, msg);
        return err;
      }
    );
  };

Test.shouldRejectWith
  = Test.rejectsWith
  = function(
      promise,
      expected,
      msg = 'promise should reject with expected value',
      msg2 = 'should be a promise') {
    const self = this;

    if (!isPromise(promise)) {
      return self.fail(msg2);
    }

    return promise.then(
      function resolves(value) {
        self.fail(msg);
      },
      function rejects(err) {
        self.throws(() => { throw err; }, expected, msg);
        return err;
      }
    );
  };

/**
 * Tests that an argument is a Promise.
 *
 * @param {Any} v Argument to test.
 * @param {String} msg (optional) The message to output.
 */
Test.isPromise = function(v, msg = 'should be a promise') {
  return this.ok(isPromise(v), msg);
};

/**
 * Tests that an argument is a non-null Object.
 *
 * @param {Any} v Argument to test.
 * @param {String} msg (optional) The message to output.
 */
Test.isObject
  = Test.isObj
  = function(v, msg = 'should be a non-null object') {
    return this.ok(isObject(v), msg);
  };

/**
 * Tests that an argument is a function.
 *
 * @param {Any} v Argument to test.
 * @param {String} msg (optional) The message to output.
 */
Test.isFunc
  = Test.isFunction
  = function(v, msg = 'should be a function') {
    return this.ok(isFunction(v), msg);
  };

/**
 * Tests that an argument has the `length` property equal to the expected value.
 *
 * @param {Any} v Argument to test.
 * @param {Number} len Expected length number.
 * @param {String} msg (optional) The message to output.
 */
Test.hasLength = function hasLength(v, len, msg = 'should have expected length') {
  return this.equal(v.length, len, msg);
};

/**
 * Determines whether the argument is a Promise:
 * - is a non-null Object, or a Function
 * - the 'then' property is a Function.
 *
 * @param {Any} p The parameter to test.
 * @returns {Boolean} True if the parameter is a Promise, false otherwise.
 */
function isPromise(p) {
  return ((isObject(p) || isFunction(p)) && isFunction(p.then));
}

/**
 * Determines whether the argument is a non-null Object.
 *
 * @param {Any} o The parameter to test.
 * @returns {Boolean} True if the parameter is a non-null Object, false otherwise.
 */
function isObject(o) {
  return (typeof o === 'object' && o !== null);
}

/**
 * Determines whether the argument is a function.
 *
 * @param {Any} f The parameter to test.
 * @returns {Boolean} True if the parameter is a function, false otherwise.
 */
function isFunction(f) {
  return (typeof f === 'function');
}
