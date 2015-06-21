
/**
 * Dependencies.
 */

var Matrix = require('..');
var assert = require('assert');

/**
 * Tests.
 */

describe('Matrix()', function() {
  it('should be a function', function() {
    assert.equal(typeof Matrix, 'function');
  });

  it('should be a constructor', function() {
    var matrix = new Matrix({});
    assert(matrix instanceof Matrix);
  });

  it('should not require the new keyword', function() {
    var matrix = Matrix({});
    assert(matrix instanceof Matrix);
  });

  it('should accept an object of dimensions', function() {
    var matrix = Matrix({ rows: 3, cols: 2 });

    assert.deepEqual(matrix.dimensions, [3, 2]);
    assert.equal(matrix[0][0], 0);
    assert.equal(matrix[0][1], 0);
    assert.equal(matrix[1][0], 0);
    assert.equal(matrix[1][1], 0);
    assert.equal(matrix[2][0], 0);
    assert.equal(matrix[2][1], 0);
  });

  it('should accept val property as a number to set initial values', function() {
    var matrix = Matrix({ rows: 3, cols: 2, val: 1 });

    assert.deepEqual(matrix.dimensions, [3, 2]);
    assert.equal(matrix[0][0], 1);
    assert.equal(matrix[0][1], 1);
    assert.equal(matrix[1][0], 1);
    assert.equal(matrix[1][1], 1);
    assert.equal(matrix[2][0], 1);
    assert.equal(matrix[2][1], 1);
  });

  it('should accept val property as a function to set initial values', function() {
    var matrix = Matrix({ rows: 1, cols: 2, val: Math.random });

    assert.deepEqual(matrix.dimensions, [1, 2]);
    assert(!Number.isInteger(matrix[0][0]) && (matrix[0][0] > 0 && matrix[0][0] < 1));
    assert(!Number.isInteger(matrix[0][1]) && (matrix[0][1] > 0 && matrix[0][1] < 1));
  });

  it('should accept a multidimensional array of values', function() {
    var matrix = Matrix([
      [5, 2, 1],
      [7, 4, 9]
    ]);

    assert.deepEqual(matrix.dimensions, [2, 3]);
    assert.equal(matrix[0][0], 5);
    assert.equal(matrix[0][1], 2);
    assert.equal(matrix[0][2], 1);
    assert.equal(matrix[1][0], 7);
    assert.equal(matrix[1][1], 4);
  });

  describe('#add()', function() {
    it('should perform addition on two matrices with equal dimensions', function() {
      var matrixOne = Matrix([
        [1, 3, 1],
        [1, 0, 0]
      ]);

      var matrixTwo = Matrix([
        [0, 0, 5],
        [7, 5, 0]
      ]);

      var result = Matrix.add(matrixOne, matrixTwo);

      assert.equal(result[0][0], 1);
      assert.equal(result[0][1], 3);
      assert.equal(result[0][2], 6);
      assert.equal(result[1][0], 8);
      assert.equal(result[1][1], 5);
      assert.equal(result[1][2], 0);
    });

    it('should not perform addition on two matrices with unequal dimensions', function() {
      var matrixOne = Matrix([
        [8, 2, 8],
        [7, 3, 4]
      ]);

      var matrixTwo = Matrix([
        [3, 4],
        [0, 6]
      ]);

      assert.throws(function(){ Matrix.add(matrixOne, matrixTwo) }, /You can only add matrices with equal dimensions/);
    });
  });

  describe('#subtract()', function() {
    it('should perform subtraction on two matrices with equal dimensions', function() {
      var matrixOne = Matrix([
        [1, 3, 1],
        [1, 0, 0]
      ]);

      var matrixTwo = Matrix([
        [0, 0, 5],
        [7, 5, 0]
      ]);

      var result = Matrix.subtract(matrixOne, matrixTwo);

      assert.equal(result[0][0], 1);
      assert.equal(result[0][1], 3);
      assert.equal(result[0][2], -4);
      assert.equal(result[1][0], -6);
      assert.equal(result[1][1], -5);
      assert.equal(result[1][2], 0);
    });

    it('should not perform subtraction on two matrices with unequal dimensions', function() {
      var matrixOne = Matrix([
        [8, 2, 8],
        [7, 3, 4]
      ]);

      var matrixTwo = Matrix([
        [3, 4],
        [0, 6]
      ]);

      assert.throws(function(){ Matrix.subtract(matrixOne, matrixTwo) }, /You can only subtract matrices with equal dimensions/);
    });
  });

  describe('#multiply()', function() {
    it('should perform multiplication on two matrices with appropriate dimensions', function() {
      var matrixOne = Matrix([
        [5, 3, 6],
        [7, 4, 3]
      ]);

      var matrixTwo = Matrix([
        [4, 1],
        [9, 4],
        [3, 1]
      ]);

      var result = Matrix.multiply(matrixOne, matrixTwo);

      assert.equal(result[0][0], 27);
      assert.equal(result[0][1], 16);
      assert.equal(result[0][2], 27);
      assert.equal(result[1][0], 73);
      assert.equal(result[1][1], 43);
      assert.equal(result[1][2], 66);
      assert.equal(result[2][0], 22);
      assert.equal(result[2][1], 13);
      assert.equal(result[2][2], 21);
    });

    it('should multiply a matrix by a scalar', function() {
      var matrixOne = Matrix([
        [7, 1, 6],
        [2, 6, 3]
      ]);

      var result = Matrix.multiply(matrixOne, 2);

      assert.equal(result[0][0], 14);
      assert.equal(result[0][1], 2);
      assert.equal(result[0][2], 12);
      assert.equal(result[1][0], 4);
      assert.equal(result[1][1], 12);
      assert.equal(result[1][2], 6);
    });

    it('should not perform multiplication on two matrices with inappropriate dimensions', function() {
      var matrixOne = Matrix([
        [7, 1, 6],
        [2, 6, 3]
      ]);

      var matrixTwo = Matrix([
        [9, 1, 8],
        [8, 2, 6]
      ]);

      assert.throws(function(){ Matrix.multiply(matrixOne, matrixTwo) }, /You can only multiply matrices where number of columns in first equals number of rows in second/);
    });
  });
});
