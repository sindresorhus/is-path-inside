import {expectType} from 'tsd';
import isPathInside = require('.');

expectType<boolean>(isPathInside('a/b/c', 'a/b'));
