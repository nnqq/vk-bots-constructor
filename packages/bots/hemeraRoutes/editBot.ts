import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { db } from '../database/client';
import { botFather } from '../helpers/BotFather';
import { handler as refreshBot } from './refreshBot';

export const path: IHemeraPath = {
  topic: 'bots',
  cmd: 'editBot',
};

export interface IParamsBase {
  isEnabled: boolean;
}

export interface IParams extends IParamsBase {
  botId: string;
}

export interface IResponse {
  updatedCount: number;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId, isEnabled } = params;

  const { nModified } = await db.bots.updateOne({
    botId,
  }, {
    isEnabled,
  });

  if (isEnabled) {
    await refreshBot({ params: { botId } });
  } else {
    botFather.killBot({ botId });
  }

  return {
    updatedCount: nModified,
  };
});
