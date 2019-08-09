import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';
import { IResponse as IEvents } from '../../events/hemeraRoutes/getEvents';
import { IResponse as IKeywords } from '../../keywords/hemeraRoutes/getKeywords';
import { events } from '../../events/client';
import { keywords } from '../../keywords/client';

export const path: IHemeraPath = {
  topic: 'bots',
  cmd: 'getBotConfig',
};

export interface IParams {
  botId: string;
}

export type IResponse = IEvents & {
  keywords: IKeywords['keywords']
};

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { botId } = params;

  const configQuery = {
    botId,
    isEnabled: true,
  };

  const [eventsResponse, keywordsResponse] = await Promise.all([
    events.getEvents(configQuery),
    keywords.getKeywords({
      ...configQuery,
      count: 100,
    }),
  ]);

  const keywordsList: IKeywords['keywords'] = [];

  if (keywordsResponse.totalCount > keywordsResponse.count) {
    const pagesCount = Math.ceil(keywordsResponse.totalCount / keywordsResponse.count);

    const requestsGetAllKeywords = [];

    for (let i = 1; i < pagesCount; i += 1) {
      requestsGetAllKeywords.push(keywords.getKeywords({
        ...configQuery,
        count: 100,
        offset: i * 100,
      }));
    }

    const allKeywords = await Promise.all(requestsGetAllKeywords);

    allKeywords.forEach((keywordsSubItem) => {
      keywordsList.push(...keywordsSubItem.keywords);
    });
  } else {
    keywordsList.push(...keywordsResponse.keywords);
  }

  return {
    botId,
    events: eventsResponse.events,
    keywords: keywordsList,
  };
});
