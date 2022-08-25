const path = require('node:path');

function isPathInside(childPath, parentPath) {
	const relation = path.relative(parentPath, childPath);

	return Boolean(
		relation &&
		relation !== '..' &&
		!relation.startsWith(`..${path.sep}`) &&
		relation !== path.resolve(childPath)
	);
}

module.exports = isPathInside;
