import { hemera } from '../lib/hemera';
import {
  IParams as createKeywordParams,
  IResponse as createKeywordResponse,
  path as createKeywordPath,
} from './hemeraRoutes/createKeyword/interfaces';

import {
  IParams as getKeywordsParams,
  IResponse as getKeywordsResponse,
  path as getKeywordsPath,
} from './hemeraRoutes/getKeywords/interfaces';

import {
  IParams as editKeywordParams,
  IResponse as editKeywordResponse,
  path as editKeywordPath,
} from './hemeraRoutes/editKeyword/interfaces';

import {
  IParams as deleteKeywordParams,
  IResponse as deleteKeywordResponse,
  path as deleteKeywordPath,
} from './hemeraRoutes/deleteKeyword/interfaces';

import {
  IParams as deleteAllKeywordsParams,
  IResponse as deleteAllKeywordsResponse,
  path as deleteAllKeywordsPath,
} from './hemeraRoutes/deleteAllKeywords/interfaces';

export const keywords = {
  createKeyword(params: createKeywordParams): Promise<createKeywordResponse> {
    return hemera.send(createKeywordPath, params);
  },

  getKeywords(params: getKeywordsParams): Promise<getKeywordsResponse> {
    return hemera.send(getKeywordsPath, params);
  },

  editKeyword(params: editKeywordParams): Promise<editKeywordResponse> {
    return hemera.send(editKeywordPath, params);
  },

  deleteKeyword(params: deleteKeywordParams): Promise<deleteKeywordResponse> {
    return hemera.send(deleteKeywordPath, params);
  },

  deleteAllKeywords(params: deleteAllKeywordsParams): Promise<deleteAllKeywordsResponse> {
    return hemera.send(deleteAllKeywordsPath, params);
  },
};
