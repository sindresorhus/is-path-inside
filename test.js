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
	const { platform } = process;
	const {resolve, sep} = path;

	path.resolve = path.win32.resolve;
	Object.defineProperty(process, 'platform', {value: 'win32'});
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

	path.resolve = resolve;
	Object.defineProperty(process, 'platform', {value: platform});
	Object.defineProperty(path, 'sep', {value: sep});
});
