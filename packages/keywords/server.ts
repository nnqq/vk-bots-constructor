import { connect } from 'mongoose';
import { hemera, mongoConnect } from '@nnqq/vk-bots-constructor-lib';

import { handler as createKeywordHandler } from './hemeraRoutes/createKeyword';
import { path as createKeywordPath } from './hemeraRoutes/createKeyword/interfaces';

import { handler as getKeywordsHandler } from './hemeraRoutes/getKeywords';
import { path as getKeywordsPath } from './hemeraRoutes/getKeywords/interfaces';

import { handler as editKeywordHandler } from './hemeraRoutes/editKeyword';
import { path as editKeywordPath } from './hemeraRoutes/editKeyword/interfaces';

import { handler as deleteKeywordHandler } from './hemeraRoutes/deleteKeyword';
import { path as deleteKeywordPath } from './hemeraRoutes/deleteKeyword/interfaces';

import { handler as deleteAllKeywordsHandler } from './hemeraRoutes/deleteAllKeywords';
import { path as deleteAllKeywordsPath } from './hemeraRoutes/deleteAllKeywords/interfaces';

hemera.registerRoutes([{
  path: createKeywordPath,
  handler: createKeywordHandler,
}, {
  path: getKeywordsPath,
  handler: getKeywordsHandler,
}, {
  path: editKeywordPath,
  handler: editKeywordHandler,
}, {
  path: deleteKeywordPath,
  handler: deleteKeywordHandler,
}, {
  path: deleteAllKeywordsPath,
  handler: deleteAllKeywordsHandler,
}]);

mongoConnect(connect);
