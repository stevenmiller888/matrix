
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
    var matrix = Matrix({ rows: 3, columns: 2 });

    assert.deepEqual(matrix.dimensions, [3, 2]);
    assert.equal(matrix[0][0], 0);
    assert.equal(matrix[0][1], 0);
    assert.equal(matrix[1][0], 0);
    assert.equal(matrix[1][1], 0);
    assert.equal(matrix[2][0], 0);
    assert.equal(matrix[2][1], 0);
  });

  it('should accept values property as a number to set initial values', function() {
    var matrix = Matrix({ rows: 3, columns: 2, values: 1 });

    assert.deepEqual(matrix.dimensions, [3, 2]);
    assert.equal(matrix[0][0], 1);
    assert.equal(matrix[0][1], 1);
    assert.equal(matrix[1][0], 1);
    assert.equal(matrix[1][1], 1);
    assert.equal(matrix[2][0], 1);
    assert.equal(matrix[2][1], 1);
  });

  it('should accept values property as a function to set initial values', function() {
    var matrix = Matrix({ rows: 1, columns: 2, values: Math.random });

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
  });

  describe('#multiplyScalar()', function() {
    it('should multiply a matrix by a scalar', function() {
      var matrixOne = Matrix([
        [7, 1, 6],
        [2, 6, 3]
      ]);

      var result = Matrix.multiplyScalar(matrixOne, 2);

      assert.equal(result[0][0], 14);
      assert.equal(result[0][1], 2);
      assert.equal(result[0][2], 12);
      assert.equal(result[1][0], 4);
      assert.equal(result[1][1], 12);
      assert.equal(result[1][2], 6);
    });
  });

  describe('#multiplyElements()', function() {
    it('should perform element-wise multiplication on two matrices', function() {
      var matrixOne = Matrix([
        [1, 0, 3],
        [5, 3, 8],
        [2, 4, 6]
      ]);

      var matrixTwo = Matrix([
        [2, 3, 7],
        [9, 1, 5],
        [8, 8, 3]
      ]);

      var result = Matrix.multiplyElements(matrixOne, matrixTwo);

      assert.equal(result[0][0], 2);
      assert.equal(result[0][1], 0);
      assert.equal(result[0][2], 21);
      assert.equal(result[1][0], 45);
      assert.equal(result[1][1], 3);
      assert.equal(result[1][2], 40);
      assert.equal(result[2][0], 16);
      assert.equal(result[2][1], 32);
      assert.equal(result[2][2], 18);
    });
  });

  describe('#tranpose()', function() {
    it('should return the transposition of the matrix', function() {
      var matrix = Matrix([
        [1],
        [5],
        [2],
        [3]
      ]);

      var result = matrix.transpose();

      assert.deepEqual(result.dimensions, [1, 4]);
      assert.equal(result[0][0], 1);
      assert.equal(result[0][1], 5);
      assert.equal(result[0][2], 2);
      assert.equal(result[0][3], 3);
    });
  });

  describe('#transform()', function() {
    it('should pass each element in the matrix into a function and use the result as the new value', function() {
      var matrix = Matrix([
        [5, 3, 6],
        [7, 4, 3]
      ]);

      var transformed = matrix.transform(function(num) { return num + 2 });

      assert.equal(transformed[0][0], 7);
      assert.equal(transformed[0][1], 5);
      assert.equal(transformed[0][2], 8);
      assert.equal(transformed[1][0], 9);
      assert.equal(transformed[1][1], 6);
      assert.equal(transformed[1][2], 5);
    });
  });
});
