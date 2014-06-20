'use strict';
var assert = require('assert');
var isPathInside = require('./');

it('should check if a path is inside another path', function () {
	assert(isPathInside('a/b/c', 'a/b'));
	assert(isPathInside('/a/b/c', '/a/b'));
	assert(!isPathInside('a/b', 'a/b'));
	assert(!isPathInside('/a/b', '/a/b'));
});
