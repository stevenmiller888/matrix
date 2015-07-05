
/**
 * Expose `Matrix`.
 */

module.exports = Matrix;

/**
 * Matrix.
 *
 * @param {Object|Array} opts
 */

function Matrix(opts){
  if (!(this instanceof Matrix)) return new Matrix(opts);

  if (Array.isArray(opts)) { // Passing in values
    this.numRows = opts.length;
    this.numCols = opts[0].length;

    for (var i = 0; i < this.numRows; i++) {
      this[i] = [];

      for (var j = 0; j < this.numCols; j++) {
        this[i][j] = opts[i][j];
      }
    }
  } else if (typeof opts === 'object') {  // Passing in dimensions
    this.numRows = opts.rows;
    this.numCols = opts.cols;

    for (var i = 0; i < this.numRows; i++) {
      this[i] = [];

      for (var j = 0; j < this.numCols; j++) {
        if (typeof opts.vals === 'function') {
          this[i][j] = opts.vals();
        } else if (typeof opts.vals === 'number') {
          this[i][j] = opts.vals;
        } else {
          this[i][j] = 0;
        }
      }
    }
  } else {
    throw new Error('You must supply an object or an array');
  }

  this.dimensions = [this.numRows, this.numCols];
}

/**
 * Add.
 *
 * @param {Matrix} m1
 * @param {Matrix} m2
 */

Matrix.add = function(m1, m2) {
  if (!(m1 instanceof Matrix) || !(m2 instanceof Matrix)) {
    throw new Error('You must supply two valid matrices');
  }

  // Number of rows and columns in first must equal number of rows and columns in second
  if (m1.numRows !== m2.numRows || m1.numCols !== m2.numCols) {
    throw new Error('You can only add matrices with equal dimensions');
  }

  var result = new Matrix({ rows: m1.numRows, cols: m1.numCols });

  for (var i = 0; i < m1.numRows; i++) {
		for (var j = 0; j < m1.numCols; j++) {
			result[i][j] = m1[i][j] + m2[i][j];
		}
	}

  return result;
};

/**
 * Add.
 *
 * @param {Matrix} m1
 * @param {Matrix} m2
 */

Matrix.subtract = function(m1, m2) {
  if (!(m1 instanceof Matrix) || !(m2 instanceof Matrix)) {
    throw new Error('You must supply two valid matrices');
  }

  // Number of rows and number of columns in first must equal number of rows and number of columns in second
  if (m1.numRows !== m2.numRows || m1.numCols !== m2.numCols) {
    throw new Error('You can only subtract matrices with equal dimensions');
  }

  var result = new Matrix({ rows: m1.numRows, cols: m1.numCols });

  for (var i = 0; i < m1.numRows; i++) {
		for (var j = 0; j < m1.numCols; j++) {
			result[i][j] = m1[i][j] - m2[i][j];
		}
	}

  return result;
};

/**
 * Multiply.
 *
 * @param {Matrix} m1
 * @param {Matrix|Number} m2
 */

Matrix.multiply = function(m1, m2) {
  if (!(m1 instanceof Matrix) || !(m2 instanceof Matrix || typeof m2 === 'number')) {
    throw new Error('You must supply two valid matrices or a matrix and a number');
  }

  if (typeof m2 === 'number') {   // Scalar multiplication
    var result = Matrix({ rows: m1.numRows, cols: m1.numCols });

    for (var i = 0; i < m1.numRows; i++) {
      for (var j = 0; j < m1.numCols; j++) {
        result[i][j] = m1[i][j] * m2;
      }
    }
  } else {
    var result = Matrix({ rows: m2.numRows, cols: m1.numCols });

    for (var i = 0; i < m2.numRows; i++) {
      result[i] = [];

      for (var j = 0; j < m1.numCols; j++) {
        var sum = 0;

        for (var k = 0; k < m1.numRows; k++) {
          sum += m1[k][j] * m2[i][k];
        }

        result[i][j] = sum;
      }
    }
  }

  return result;
};

/**
 * Perform element-wise multiplcation.
 *
 * @param {Matrix} m1
 * @param {Matrix} m2
 */

Matrix.multiplyElements = function(m1, m2) {
  var result = Matrix({ rows: m1.numRows, cols: m1.numCols })

  for (var i = 0; i < m1.numRows; i++) {
   result[i] = [];

   for (var j = 0; j < m1[i].length; j++) {
     result[i][j] = m1[i][j] * m2[i][j];
   }
  }

  return result;
};

/**
 * Compute the tranpose.
 *
 * @return {Matrix} result
 */

Matrix.prototype.transpose = function() {
  var result = Matrix({ rows: this.numCols, cols: this.numRows });

  for (var i = 0; i < this.numCols; i++) {
    result[i] = [];

    for (var j = 0; j < this.numRows; j++) {
      result[i][j] = this[j][i];
    }
  }

  return result;
};

/**
 * Apply a function to each element in the matrix.
 *
 * @param {Function} fn
 * @return {Matrix} result
 */

Matrix.prototype.transform = function(fn) {
  var result = Matrix({ rows: this.numRows, cols: this.numCols });

  for (var i = 0; i < result.numRows; i++) {
		for (var j = 0; j < result.numCols; j++) {
			result[i][j] = fn(this[i][j]);
		}
	}

  return result;
};
