
# matrix
[![NPM version][npm-image]][npm-url]
[![build status][circle-image]][circle-url]
[![license][license-image]][license-url]

> A tiny matrix library written in JavaScript

## Installation

```bash
$ npm install node-matrix
```

## Example

```js
var m1 = Matrix([
  [1, 3, 1],
  [1, 0, 0]
]);

var m2 = Matrix([
  [0, 0, 5],
  [7, 5, 0]
]);

Matrix.add(m1, m2); // [ [1, 3, 6], [8, 5, 0] ]
```

## API

### Matrix()

Create a new instance of Matrix. You can pass in an object specifying the dimensions or you can pass in a multidimensional array:

```js
// Set the value of each element to 0
var matrix = Matrix({ rows: 3, cols: 2 });
```

```js
// Set the value of each element to 5
var matrix = Matrix({ rows: 3, cols: 2, val: 5 });
```

```js
// Set the value of each element to a random number
var matrix = Matrix({ rows: 3, cols: 2, vals: Math.random });
```

```js
// Infers the number of rows and columns
var matrix = Matrix([
  [4, 1, 9],
  [3, 8, 2]
]);
```

You can access the matrix's values the same way you can access them from an array: `matrix[0][1]`, with `0` corresponding to the row number and `1` corresponding to the column number. You also now have access to `matrix.dimensions`, which will return an array where the first element is the number of rows in the matrix, and the second element is the number of columns in the matrix.

### Matrix.add()

```js
Matrix.add(m1, m2);
```

### Matrix.subtract()

```js
Matrix.subtract(m1, m2);
```

### Matrix.multiply()

```js
Matrix.multiply(m1, m2);
Matrix.multiply(m1, 4);   // perform scalar multiplication
```

### matrix.transform()

```js
matrix.transform(function(num) { return num - 2 });   // subtract two from each element in the matrix
```

## License

[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/node-matrix.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-matrix
[circle-image]: https://img.shields.io/circleci/project/stevenmiller888/matrix.svg
[circle-url]: https://circleci.com/gh/stevenmiller888/matrix
[license-image]: https://img.shields.io/npm/l/express.svg
[license-url]: https://tldrlegal.com/license/mit-license