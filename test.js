import test from 'ava';
import m from '.';

test(t => {
	t.true(m('a/b/c', 'a/b'));
	t.true(m('/a/b/c', '/a/b'));
	t.false(m('a/b', 'a/b'));
	t.false(m('/a/b', '/a/b'));
});
