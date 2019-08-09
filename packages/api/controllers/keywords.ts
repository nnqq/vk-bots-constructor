import { Request } from '@hapi/hapi';
import { IParams as ICreateKeywordParams } from '../../keywords/hemeraRoutes/createKeyword';
import { IParams as IGetKeywordsParams } from '../../keywords/hemeraRoutes/getKeywords';
import { IParams as IEditKeywordParams } from '../../keywords/hemeraRoutes/editKeyword';
import { IParams as IDeleteKeywordParams } from '../../keywords/hemeraRoutes/deleteKeyword';
import { keywords } from '../../keywords/client';

interface ICreateKeyword {
  payload: ICreateKeywordParams;
}
type ICreateKeywordRequest = Request & ICreateKeyword;

interface IGetKeywords {
  query: IGetKeywordsParams;
}
type IGetKeywordsRequest = Request & IGetKeywords;

interface IEditKeyword {
  payload: IEditKeywordParams;
}
type IEditKeywordRequest = Request & IEditKeyword;

interface IDeleteKeyword {
  payload: IDeleteKeywordParams;
}
type IDeleteKeywordRequest = Request & IDeleteKeyword;

export const controllers = {
  createKeyword(req: ICreateKeywordRequest) {
    return keywords.createKeyword(req.payload);
  },

  getKeywords(req: IGetKeywordsRequest) {
    return keywords.getKeywords(req.query);
  },

  editKeyword(req: IEditKeywordRequest) {
    return keywords.editKeyword(req.payload);
  },

  deleteKeyword(req: IDeleteKeywordRequest) {
    return keywords.deleteKeyword(req.payload);
  },
};
