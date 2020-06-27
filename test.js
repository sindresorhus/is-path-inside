import path from 'path';
import test from 'ava';
import isPathInside from '.';

test('main', t => {
	t.true(isPathInside('a', '/'));
	t.true(isPathInside('a', '.'));
	t.true(isPathInside('a', './'));
	t.true(isPathInside('a/', '/'));
	t.true(isPathInside('a/', '.'));
	t.true(isPathInside('a/', './'));
	t.true(isPathInside('a/b', 'a'));
	t.true(isPathInside('a/b', 'a/'));
	t.true(isPathInside('a/b/', 'a'));
	t.true(isPathInside('a/b/', 'a/'));
	t.true(isPathInside('A/b', 'A'));

	t.true(isPathInside('/a', '/'));
	t.true(isPathInside('/a/', '/'));
	t.true(isPathInside('/a/b', '/a'));
	t.true(isPathInside('/a/b', '/a/'));
	t.true(isPathInside('/a/b/', '/a'));
	t.true(isPathInside('/a/b/', '/a/'));

	t.false(isPathInside('..', '.'));
	t.false(isPathInside('.', '.'));
	t.false(isPathInside('.', './'));
	t.false(isPathInside('./', '.'));
	t.false(isPathInside('./', './'));
	t.false(isPathInside('.', 'a'));
	t.false(isPathInside('.', 'a/'));
	t.false(isPathInside('./', 'a'));
	t.false(isPathInside('./', 'a/'));
	t.false(isPathInside('a', 'a'));
	t.false(isPathInside('a', 'a/'));
	t.false(isPathInside('a/', 'a'));
	t.false(isPathInside('a/', 'a/'));
	t.false(isPathInside('A/b', 'a'));
	t.false(isPathInside('a/b', 'A'));
	t.false(isPathInside('/', '/'));
	t.false(isPathInside('/', '/a'));
	t.false(isPathInside('/', '/a/'));
	t.false(isPathInside('/a', '/a'));
	t.false(isPathInside('/a', '/a/'));
	t.false(isPathInside('/a/', '/a'));
	t.false(isPathInside('/a/', '/a/'));
	t.false(isPathInside('/a/b', '/a/b'));
	t.false(isPathInside('/a/bc/d', '/a/b'));
});

test('win32', t => {
	const {relative, resolve, sep} = path;

	path.relative = path.win32.relative;
	path.resolve = path.win32.resolve;
	Object.defineProperty(path, 'sep', {value: path.win32.sep});

	t.true(isPathInside('a', '\\'));
	t.true(isPathInside('a', '.'));
	t.true(isPathInside('a', '.\\'));
	t.true(isPathInside('a\\', '\\'));
	t.true(isPathInside('a\\', '.'));
	t.true(isPathInside('a\\', '.\\'));
	t.true(isPathInside('a\\b', 'a'));
	t.true(isPathInside('a\\b', 'a\\'));
	t.true(isPathInside('a\\b\\', 'a'));
	t.true(isPathInside('a\\b\\', 'a\\'));
	t.true(isPathInside('A\\b', 'A'));
	t.true(isPathInside('A\\b', 'a'));
	t.true(isPathInside('a\\b', 'A'));

	t.true(isPathInside('\\a', '\\'));
	t.true(isPathInside('\\a\\', '\\'));
	t.true(isPathInside('\\a\\b', '\\a'));
	t.true(isPathInside('\\a\\b', '\\a\\'));
	t.true(isPathInside('\\a\\b\\', '\\a'));
	t.true(isPathInside('\\a\\b\\', '\\a\\'));

	t.false(isPathInside('..', '.'));
	t.false(isPathInside('.', '.'));
	t.false(isPathInside('.', '.\\'));
	t.false(isPathInside('.\\', '.'));
	t.false(isPathInside('.\\', '.\\'));
	t.false(isPathInside('.', 'a'));
	t.false(isPathInside('.', 'a\\'));
	t.false(isPathInside('.\\', 'a'));
	t.false(isPathInside('.\\', 'a\\'));
	t.false(isPathInside('a', 'a'));
	t.false(isPathInside('a', 'a\\'));
	t.false(isPathInside('a\\', 'a'));
	t.false(isPathInside('a\\', 'a\\'));
	t.false(isPathInside('\\', '\\'));
	t.false(isPathInside('\\', '\\a'));
	t.false(isPathInside('\\', '\\a\\'));
	t.false(isPathInside('\\a', '\\a'));
	t.false(isPathInside('\\a', '\\a\\'));
	t.false(isPathInside('\\a\\', '\\a'));
	t.false(isPathInside('\\a\\', '\\a\\'));
	t.false(isPathInside('\\a\\b', '\\a\\b'));
	t.false(isPathInside('\\a\\bc\\d', '\\a\\b'));

	t.false(isPathInside('A\\b', 'a\\b'));
	t.true(isPathInside('c:\\a\\b', 'C:\\a'));
	t.false(isPathInside('C:\\a\\b', 'c:\\a\\b'));
	t.false(isPathInside('C:\\a\\b', 'D:\\a'));
	t.false(isPathInside('a\\bc\\d', 'a\\b'));

	path.relative = relative;
	path.resolve = resolve;
	Object.defineProperty(path, 'sep', {value: sep});
});
