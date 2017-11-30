'use strict';
const path = require('path');
const pathIsInside = require('path-is-inside');

module.exports = (a, b) => {
	a = path.resolve(a);
	b = path.resolve(b);

	if (a === b) {
		return false;
	}

	return pathIsInside(a, b);
};
