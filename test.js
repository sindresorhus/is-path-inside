import test from 'ava';
import isPathInside from '.';

test('main', t => {
	t.true(isPathInside('a/b/c', 'a/b'));
	t.true(isPathInside('/a/b/c', '/a/b'));
	t.false(isPathInside('a/b', 'a/b'));
	t.false(isPathInside('/a/b', '/a/b'));
});
