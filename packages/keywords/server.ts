import { hemera } from '../lib/hemera';
import { path as createKeywordPath, handler as createKeywordHandler } from './hemeraRoutes/createKeyword';
import { path as getKeywordsPath, handler as getKeywordsHandler } from './hemeraRoutes/getKeywords';
import { path as editKeywordPath, handler as editKeywordHandler } from './hemeraRoutes/editKeyword';
import { path as deleteKeywordPath, handler as deleteKeywordHandler } from './hemeraRoutes/deleteKeyword';

hemera.add(createKeywordPath, createKeywordHandler);
hemera.add(getKeywordsPath, getKeywordsHandler);
hemera.add(editKeywordPath, editKeywordHandler);
hemera.add(deleteKeywordPath, deleteKeywordHandler);
