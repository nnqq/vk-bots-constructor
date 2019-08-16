import mongoose from 'mongoose';
import { hemera } from '../lib/hemera';
import { mongoConnect } from '../lib/mongo';
import { path as createKeywordPath, handler as createKeywordHandler } from './hemeraRoutes/createKeyword';
import { path as getKeywordsPath, handler as getKeywordsHandler } from './hemeraRoutes/getKeywords';
import { path as editKeywordPath, handler as editKeywordHandler } from './hemeraRoutes/editKeyword';
import { path as deleteKeywordPath, handler as deleteKeywordHandler } from './hemeraRoutes/deleteKeyword';

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
}]);

mongoConnect(mongoose);
