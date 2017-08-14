'use strict';
var path = require('path');
var pathIsInside = require('path-is-inside');

module.exports = function (a, b) {
	a = path.resolve(process.cwd(), a);
	b = path.resolve(process.cwd(), b);

	if (a === b) {
		return false;
	}

	return pathIsInside(a, b);
};
