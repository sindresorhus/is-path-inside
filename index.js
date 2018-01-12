'use strict';
const path = require('path');
const pathIsInside = require('path-is-inside');

module.exports = (a, b) => {
	a = path.resolve(a);
	b = path.resolve(b);

	return a === b ? false : pathIsInside(a, b);
};
