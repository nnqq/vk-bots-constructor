import { Vk } from '@nnqq/vk-bots-constructor-lib';
import { handler } from './index';
import { db } from '../../database';
import { events } from '../../../events';
import { keywords } from '../../../keywords';
import { users } from '../../../users';
import { botFather } from '../../helpers/BotFather';

jest.mock('../../constants', () => ({
  DOMAIN: 'https://example.com',
}));
jest.mock('../../helpers/BotFather');

describe('Should completely delete Bot', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  jest.spyOn(db.bots, 'findOne').mockImplementation((query: any): any => {
    expect(query).toEqual({
      botId: '475208d2-3e44-479a-8d78-24d1714549d9',
    });

    return {
      lean: () => Promise.resolve({
        botId: '475208d2-3e44-479a-8d78-24d1714549d9',
        vkGroupId: 12345,
        vkGroupAccessToken: 'b0c7437467d34ef5b1d8aad633f3d98d47a04c43ebb24d5c873ea5718557bdd4',
        secret: 'e03fbe2efd9b4d97a361a634fe2f0aa4',
        confirmation: 'aa1bb2cc3',
        isEnabled: true,
      }),
    };
  });

  jest.spyOn(Vk.prototype, 'api').mockImplementation((method, query) => {
    if (method === 'groups.getCallbackServers') {
      expect(query).toEqual({
        group_id: 12345,
      });

      return Promise.resolve({
        count: 2,
        items: [{
          id: 1,
          title: 'cb_server_one',
          creator_id: 111222333,
          url: 'https://url-one.com',
          secret_key: 'f337cf49d2d642b2a37da395a6a5e4d0',
          status: 'ok',
        }, {
          id: 2,
          title: 'cb_server_two',
          creator_id: 111222333,
          url: 'https://example.com/475208d2-3e44-479a-8d78-24d1714549d9',
          secret_key: '98589c86de8346dcb4587d9fdb9db624',
          status: 'ok',
        }],
      });
    }

    if (method === 'groups.deleteCallbackServer') {
      expect(query).toEqual({
        group_id: 12345,
        server_id: 2,
      });

      return Promise.resolve(1);
    }


    throw new Error('Unexpected vk.api method');
  });

  jest.spyOn(db.bots, 'deleteOne').mockImplementation((query: any): any => {
    expect(query).toEqual({
      botId: '475208d2-3e44-479a-8d78-24d1714549d9',
    });

    return Promise.resolve({
      ok: 1,
      n: 1,
    });
  });

  jest.spyOn(events, 'deleteAllEvents').mockImplementation((params) => {
    expect(params).toEqual({
      botId: '475208d2-3e44-479a-8d78-24d1714549d9',
    });

    return Promise.resolve({
      deletedCount: 1,
    });
  });

  jest.spyOn(keywords, 'deleteAllKeywords').mockImplementation((params) => {
    expect(params).toEqual({
      botId: '475208d2-3e44-479a-8d78-24d1714549d9',
    });

    return Promise.resolve({
      deletedCount: 1,
    });
  });

  jest.spyOn(users, 'deleteBot').mockImplementation((params) => {
    expect(params).toEqual({
      botId: '475208d2-3e44-479a-8d78-24d1714549d9',
      userId: '92c5c8c6-0f2e-4bf7-89af-0f67e7aadb3a',
    });

    return Promise.resolve({
      deletedCount: 1,
    });
  });

  test('Successfully delete Bot', async () => {
    const response = {
      deletedBotsCount: 1,
      deletedEventsCount: 1,
      deletedKeywordsCount: 1,
      deletedBotsFromProfile: 1,
      isCbServerDeleted: true,
    };

    const result = await handler({
      params: {
        botId: '475208d2-3e44-479a-8d78-24d1714549d9',
        userId: '92c5c8c6-0f2e-4bf7-89af-0f67e7aadb3a',
      },
    });

    expect(botFather.killBot).toBeCalled();

    expect(result).toEqual(response);
  });

  test('Throw error if Bot not found', async () => {
    jest.spyOn(db.bots, 'findOne').mockImplementation((query: any): any => {
      expect(query).toEqual({
        botId: '71062a7a-e5c4-4c92-8c36-65e9846d9561',
      });

      return {
        lean() {
          return Promise.resolve(null);
        },
      };
    });

    const expectedError = new Error('Bot with botId=71062a7a-e5c4-4c92-8c36-65e9846d9561 not found');

    try {
      await handler({
        params: {
          botId: '71062a7a-e5c4-4c92-8c36-65e9846d9561',
          userId: '92c5c8c6-0f2e-4bf7-89af-0f67e7aadb3a',
        },
      });
    } catch (e) {
      expect(e).toEqual(expectedError);
    }
  });
});
