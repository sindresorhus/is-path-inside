import path from 'path';
import test from 'ava';
import isPathInside from '.';

test('main', t => {
	t.true(isPathInside('a/b/c', 'a/b'));
	t.true(isPathInside('a/b/c/', 'a/b/'));
	t.true(isPathInside('a/b/c', 'a/b/'));
	t.true(isPathInside('a/b/c/', 'a/b'));
	t.true(isPathInside('/a/b/c', '/a/b'));
	t.false(isPathInside('a/b', 'a/b'));
	t.false(isPathInside('/a/b', '/a/b'));
	t.false(isPathInside('A/b/c', 'a/b'));
	t.false(isPathInside('/a/bc/d', '/a/b'));
});

test('win32', t => {
	const processPlatform = process.platform;
	const pathSep = path.sep;

	const {resolve} = path;
	path.resolve = path.win32.resolve;
	Object.defineProperty(process, 'platform', {value: 'win32'});
	Object.defineProperty(path, 'sep', {value: '\\'});

	t.true(isPathInside('a\\b\\c', 'a\\b'));
	t.true(isPathInside('a\\b\\c\\', 'a\\b'));
	t.true(isPathInside('a\\b\\c', 'a\\b\\'));
	t.true(isPathInside('a\\b\\c\\', 'a\\b\\'));
	t.true(isPathInside('A\\b\\c', 'a\\b'));
	t.false(isPathInside('A\\b', 'a\\b'));
	t.true(isPathInside('c:\\a\\b\\c\\d', 'C:\\a\\b\\c'));
	t.false(isPathInside('C:\\a\\b\\c', 'c:\\a\\b\\c'));
	t.false(isPathInside('a\\bc\\d', 'a\\b'));

	path.resolve = resolve;
	Object.defineProperty(process, 'platform', {value: processPlatform});
	Object.defineProperty(path, 'sep', {value: pathSep});
});
