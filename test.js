import test from 'ava';
import fn from './';

test('should check if a path is inside another path', t => {
	t.true(fn('a/b/c', 'a/b'));
	t.true(fn('/a/b/c', '/a/b'));
	t.false(fn('a/b', 'a/b'));
	t.false(fn('/a/b', '/a/b'));
	t.end();
});
