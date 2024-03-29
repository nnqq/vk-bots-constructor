import { IParamsBase as ICreateKeywordParams } from '../../keywords/hemeraRoutes/createKeyword/interfaces';
import { IParams as IGetKeywordsParams } from '../../keywords/hemeraRoutes/getKeywords/interfaces';
import { IParamsBase as IEditKeywordParams } from '../../keywords/hemeraRoutes/editKeyword/interfaces';
import { IParamsBase as IDeleteKeywordParams } from '../../keywords/hemeraRoutes/deleteKeyword/interfaces';
import { keywords } from '../../keywords';
import { IQueryBotId } from '../interfaces';

type ICreateKeyword = {
  payload: ICreateKeywordParams;
} & IQueryBotId;

interface IGetKeywords {
  query: IGetKeywordsParams;
}

type IEditKeyword = {
  payload: IEditKeywordParams;
} & IQueryBotId;

type IDeleteKeyword = {
  payload: IDeleteKeywordParams;
} & IQueryBotId;

export const controllers = {
  createKeyword(req: ICreateKeyword) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return keywords.createKeyword(params);
  },

  getKeywords(req: IGetKeywords) {
    return keywords.getKeywords(req.query);
  },

  editKeyword(req: IEditKeyword) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return keywords.editKeyword(params);
  },

  deleteKeyword(req: IDeleteKeyword) {
    const params = {
      ...req.payload,
      ...req.query,
    };

    return keywords.deleteKeyword(params);
  },
};
