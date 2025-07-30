import path from 'node:path';

export default function isPathInside(childPath, parentPath) {
	const resolvedParent = path.resolve(parentPath);
	const resolvedChild = path.resolve(childPath);
	const relative = path.relative(resolvedParent, resolvedChild);

	return !relative.startsWith('..') && !path.isAbsolute(relative);
}
