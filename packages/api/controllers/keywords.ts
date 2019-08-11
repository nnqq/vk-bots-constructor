import { Request } from '@hapi/hapi';
import { IParamsBase as ICreateKeywordParams } from '../../keywords/hemeraRoutes/createKeyword';
import { IParams as IGetKeywordsParams } from '../../keywords/hemeraRoutes/getKeywords';
import { IParamsBase as IEditKeywordParams } from '../../keywords/hemeraRoutes/editKeyword';
import { IParamsBase as IDeleteKeywordParams } from '../../keywords/hemeraRoutes/deleteKeyword';
import { keywords } from '../../keywords/client';
import { IQueryBotId } from '../interfaces';

interface ICreateKeyword {
  payload: ICreateKeywordParams;
}
type ICreateKeywordRequest = ICreateKeyword & IQueryBotId & Request;

interface IGetKeywords {
  query: IGetKeywordsParams;
}
type IGetKeywordsRequest = IGetKeywords & Request;

interface IEditKeyword {
  payload: IEditKeywordParams;
}
type IEditKeywordRequest = IEditKeyword & IQueryBotId & Request;

interface IDeleteKeyword {
  payload: IDeleteKeywordParams;
}
type IDeleteKeywordRequest = IDeleteKeyword & IQueryBotId & Request;

export const controllers = {
  createKeyword(req: ICreateKeywordRequest) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return keywords.createKeyword(params);
  },

  getKeywords(req: IGetKeywordsRequest) {
    return keywords.getKeywords(req.query);
  },

  editKeyword(req: IEditKeywordRequest) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return keywords.editKeyword(params);
  },

  deleteKeyword(req: IDeleteKeywordRequest) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return keywords.deleteKeyword(params);
  },
};
