import {expectType} from 'tsd';
import isPathInside from './index.js';

expectType<boolean>(isPathInside('a/b/c', 'a/b'));
