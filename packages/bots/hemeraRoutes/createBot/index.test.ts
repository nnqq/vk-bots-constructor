import fetch from 'node-fetch';
import uuidv4 from 'uuid/v4';
import { Vk } from '@nnqq/vk-bots-constructor-lib';
import { handler } from './index';
import { db } from '../../database';
import { botFather } from '../../helpers/BotFather';
import { users } from '../../../users';

jest.mock('node-fetch');
jest.mock('uuid/v4');
jest.mock('../../constants', () => ({
  CLIENT_ID: '112233',
  CLIENT_SECRET: '6d0ed57038b0429b8e4d9c21a0ac21e7',
  REDIRECT_URI: 'https://example.com/test',
  DOMAIN: 'https://example.com',
}));

describe('Should create new Bot', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  (fetch as unknown as jest.Mock).mockImplementation((url: string) => {
    expect(url).toEqual('https://oauth.vk.com/access_token?client_id=112233&client_secret=6d0ed57038b0429b8e4d9c21a0ac21e7&redirect_uri=https%3A%2F%2Fexample.com%2Ftest&code=e90bcd5bd8ae4330b97e02a2158da16357c79b31a1c0458e81766c69af0d9963');

    return Promise.resolve({
      json: () => Promise.resolve({
        access_token_12345: '4d9b1bfa2f18487cb0eb3860e8aa72927b0a118aa0dc43ea96ae4f31ab494bb0',
        expires_in: 0,
      }),
    });
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
          url: 'https://url.cb-server.com',
          secret_key: 'f337cf49d2d642b2a37da395a6a5e4d0',
          status: 'ok',
        }, {
          id: 2,
          title: 'cb_server_two',
          creator_id: 111222333,
          url: 'https://url.cb-server.com',
          secret_key: '98589c86de8346dcb4587d9fdb9db624',
          status: 'ok',
        }],
      });
    }

    if (method === 'groups.getCallbackConfirmationCode') {
      expect(query).toEqual({
        group_id: 12345,
      });

      return Promise.resolve({
        code: 'aa1bb2cc3',
      });
    }

    if (method === 'groups.addCallbackServer') {
      expect(query).toEqual({
        group_id: 12345,
        url: 'https://example.com/6130176e-46d6-41d4-b88a-fbe2e55ff7a5',
        title: 'VK-BC-1',
        secret_key: '3fe3c3a99dae4999b70a5cb8c55a310f',
      });

      return Promise.resolve({
        server_id: 3,
      });
    }

    if (method === 'groups.setCallbackSettings') {
      expect(query).toEqual({
        group_id: 12345,
        server_id: 3,
        api_version: '5.101',
        message_new: 1,
        message_allow: 1,
        message_deny: 1,
        group_join: 1,
        group_leave: 1,
      });

      return Promise.resolve();
    }

    if (method === 'groups.deleteCallbackServer') {
      expect(query).toEqual({
        group_id: 12345,
        server_id: 1,
      });
    }

    throw new Error('Unexpected vk.api method');
  });

  jest.spyOn(db.bots, 'countDocuments').mockImplementation((criteria: any): any => {
    expect(criteria).toEqual({
      vkGroupId: 12345,
    });

    return Promise.resolve(0);
  });

  jest.spyOn(botFather, 'loadBot').mockImplementation((params: any) => {
    expect(params).toEqual({
      botId: '6130176e-46d6-41d4-b88a-fbe2e55ff7a5',
      vkGroupId: 12345,
      vkGroupAccessToken: '4d9b1bfa2f18487cb0eb3860e8aa72927b0a118aa0dc43ea96ae4f31ab494bb0',
      secret: '3fe3c3a99dae4999b70a5cb8c55a310f',
      confirmation: 'aa1bb2cc3',
    });
  });

  jest.spyOn(db.bots, 'create').mockImplementation((createBotQuery: any): any => {
    expect(createBotQuery).toEqual({
      botId: '6130176e-46d6-41d4-b88a-fbe2e55ff7a5',
      vkGroupId: 12345,
      vkGroupAccessToken: '4d9b1bfa2f18487cb0eb3860e8aa72927b0a118aa0dc43ea96ae4f31ab494bb0',
      secret: '3fe3c3a99dae4999b70a5cb8c55a310f',
      confirmation: 'aa1bb2cc3',
    });

    return Promise.resolve({
      botId: '6130176e-46d6-41d4-b88a-fbe2e55ff7a5',
      vkGroupId: 12345,
      vkGroupAccessToken: '4d9b1bfa2f18487cb0eb3860e8aa72927b0a118aa0dc43ea96ae4f31ab494bb0',
      secret: '3fe3c3a99dae4999b70a5cb8c55a310f',
      confirmation: 'aa1bb2cc3',
    });
  });

  jest.spyOn(users, 'addBot').mockImplementation((params: any) => {
    expect(params).toEqual({
      userId: 'b6a6d7cc-1a15-4a2f-a018-70175d058966',
      botId: '6130176e-46d6-41d4-b88a-fbe2e55ff7a5',
    });

    return Promise.resolve({
      addedCount: 1,
    });
  });

  test('Successfully create new Bot', async () => {
    (uuidv4 as jest.Mock)
      .mockReturnValueOnce('6130176e-46d6-41d4-b88a-fbe2e55ff7a5')
      .mockReturnValueOnce('3fe3c3a9-9dae-4999-b70a-5cb8c55a310f');

    const response = {
      botId: '6130176e-46d6-41d4-b88a-fbe2e55ff7a5',
    };

    const result = await handler({
      params: {
        code: 'e90bcd5bd8ae4330b97e02a2158da16357c79b31a1c0458e81766c69af0d9963',
        state: 'b6a6d7cc-1a15-4a2f-a018-70175d058966',
      },
    });

    expect(result).toEqual(response);
  });

  test('Successfully create new Bot if group callback servers count is 10', async () => {
    (uuidv4 as jest.Mock)
      .mockReturnValueOnce('6130176e-46d6-41d4-b88a-fbe2e55ff7a5')
      .mockReturnValueOnce('3fe3c3a9-9dae-4999-b70a-5cb8c55a310f');

    jest.spyOn(Vk.prototype, 'api').mockImplementation((method, query) => {
      if (method === 'groups.getCallbackServers') {
        expect(query).toEqual({
          group_id: 12345,
        });

        return Promise.resolve({
          count: 10,
          items: [{
            id: 1,
            title: 'cb_server_one',
            creator_id: 111222333,
            url: 'https://url.cb-server.com',
            secret_key: 'f337cf49d2d642b2a37da395a6a5e4d0',
            status: 'ok',
          }, {
            id: 2,
            title: 'cb_server_two',
            creator_id: 111222333,
            url: 'https://url.cb-server.com',
            secret_key: '98589c86de8346dcb4587d9fdb9db624',
            status: 'ok',
          }, {
            id: 3,
            title: 'cb_server_three',
            creator_id: 111222333,
            url: 'https://url.cb-server.com',
            secret_key: '98589c86de8346dcb4587d9fdb9db624',
            status: 'ok',
          }, {
            id: 4,
            title: 'cb_server_four',
            creator_id: 111222333,
            url: 'https://url.cb-server.com',
            secret_key: '98589c86de8346dcb4587d9fdb9db624',
            status: 'ok',
          }, {
            id: 5,
            title: 'cb_server_five',
            creator_id: 111222333,
            url: 'https://url.cb-server.com',
            secret_key: '98589c86de8346dcb4587d9fdb9db624',
            status: 'ok',
          }, {
            id: 6,
            title: 'cb_server_six',
            creator_id: 111222333,
            url: 'https://url.cb-server.com',
            secret_key: '98589c86de8346dcb4587d9fdb9db624',
            status: 'ok',
          }, {
            id: 7,
            title: 'cb_server_seven',
            creator_id: 111222333,
            url: 'https://url.cb-server.com',
            secret_key: '98589c86de8346dcb4587d9fdb9db624',
            status: 'ok',
          }, {
            id: 8,
            title: 'cb_server_eight',
            creator_id: 111222333,
            url: 'https://url.cb-server.com',
            secret_key: '98589c86de8346dcb4587d9fdb9db624',
            status: 'ok',
          }, {
            id: 9,
            title: 'cb_server_nine',
            creator_id: 111222333,
            url: 'https://url.cb-server.com',
            secret_key: '98589c86de8346dcb4587d9fdb9db624',
            status: 'ok',
          }, {
            id: 10,
            title: 'cb_server_ten',
            creator_id: 111222333,
            url: 'https://url.cb-server.com',
            secret_key: '98589c86de8346dcb4587d9fdb9db624',
            status: 'ok',
          }],
        });
      }

      if (method === 'groups.getCallbackConfirmationCode') {
        expect(query).toEqual({
          group_id: 12345,
        });

        return Promise.resolve({
          code: 'aa1bb2cc3',
        });
      }

      if (method === 'groups.addCallbackServer') {
        expect(query).toEqual({
          group_id: 12345,
          url: 'https://example.com/6130176e-46d6-41d4-b88a-fbe2e55ff7a5',
          title: 'VK-BC-1',
          secret_key: '3fe3c3a99dae4999b70a5cb8c55a310f',
        });

        return Promise.resolve({
          server_id: 3,
        });
      }

      if (method === 'groups.setCallbackSettings') {
        expect(query).toEqual({
          group_id: 12345,
          server_id: 3,
          api_version: '5.101',
          message_new: 1,
          message_allow: 1,
          message_deny: 1,
          group_join: 1,
          group_leave: 1,
        });

        return Promise.resolve();
      }

      if (method === 'groups.deleteCallbackServer') {
        expect(query).toEqual({
          group_id: 12345,
          server_id: 1,
        });

        return Promise.resolve();
      }

      throw new Error('Unexpected vk.api method');
    });

    const response = {
      botId: '6130176e-46d6-41d4-b88a-fbe2e55ff7a5',
    };

    const result = await handler({
      params: {
        code: 'e90bcd5bd8ae4330b97e02a2158da16357c79b31a1c0458e81766c69af0d9963',
        state: 'b6a6d7cc-1a15-4a2f-a018-70175d058966',
      },
    });

    expect(result).toEqual(response);
  });

  test('Throw error if OAuth fails', async () => {
    (uuidv4 as jest.Mock)
      .mockReturnValueOnce('6130176e-46d6-41d4-b88a-fbe2e55ff7a5')
      .mockReturnValueOnce('3fe3c3a9-9dae-4999-b70a-5cb8c55a310f');

    (fetch as unknown as jest.Mock).mockImplementation((url: string) => {
      expect(url).toEqual('https://oauth.vk.com/access_token?client_id=112233&client_secret=6d0ed57038b0429b8e4d9c21a0ac21e7&redirect_uri=https%3A%2F%2Fexample.com%2Ftest&code=e90bcd5bd8ae4330b97e02a2158da16357c79b31a1c0458e81766c69af0d9963');

      return Promise.resolve({
        json: () => Promise.resolve({
          error: 'OAuth fail',
          error_description: 'OAuth error description',
        }),
      });
    });

    const expectedError = new Error('OAuth error description');

    try {
      await handler({
        params: {
          code: 'e90bcd5bd8ae4330b97e02a2158da16357c79b31a1c0458e81766c69af0d9963',
          state: 'b6a6d7cc-1a15-4a2f-a018-70175d058966',
        },
      });
    } catch (e) {
      expect(e).toEqual(expectedError);
    }
  });

  test('Throw error if trying to add second bot to single group', async () => {
    (fetch as unknown as jest.Mock).mockImplementation((url: string) => {
      expect(url).toEqual('https://oauth.vk.com/access_token?client_id=112233&client_secret=6d0ed57038b0429b8e4d9c21a0ac21e7&redirect_uri=https%3A%2F%2Fexample.com%2Ftest&code=e90bcd5bd8ae4330b97e02a2158da16357c79b31a1c0458e81766c69af0d9963');

      return Promise.resolve({
        json: () => Promise.resolve({
          access_token_12345: '4d9b1bfa2f18487cb0eb3860e8aa72927b0a118aa0dc43ea96ae4f31ab494bb0',
          expires_in: 0,
        }),
      });
    });

    (uuidv4 as jest.Mock)
      .mockReturnValueOnce('6130176e-46d6-41d4-b88a-fbe2e55ff7a5')
      .mockReturnValueOnce('3fe3c3a9-9dae-4999-b70a-5cb8c55a310f');

    jest.spyOn(db.bots, 'countDocuments').mockImplementation((criteria: any): any => {
      expect(criteria).toEqual({
        vkGroupId: 12345,
      });

      return Promise.resolve(1);
    });

    const expectedError = new Error('Can\'t create second bot in one group');

    try {
      await handler({
        params: {
          code: 'e90bcd5bd8ae4330b97e02a2158da16357c79b31a1c0458e81766c69af0d9963',
          state: 'b6a6d7cc-1a15-4a2f-a018-70175d058966',
        },
      });
    } catch (e) {
      expect(e).toEqual(expectedError);
    }
  });

  test('Throw error if found several bots in 1 group', async () => {
    (fetch as unknown as jest.Mock).mockImplementation((url: string) => {
      expect(url).toEqual('https://oauth.vk.com/access_token?client_id=112233&client_secret=6d0ed57038b0429b8e4d9c21a0ac21e7&redirect_uri=https%3A%2F%2Fexample.com%2Ftest&code=e90bcd5bd8ae4330b97e02a2158da16357c79b31a1c0458e81766c69af0d9963');

      return Promise.resolve({
        json: () => Promise.resolve({
          access_token_12345: '4d9b1bfa2f18487cb0eb3860e8aa72927b0a118aa0dc43ea96ae4f31ab494bb0',
          expires_in: 0,
        }),
      });
    });

    (uuidv4 as jest.Mock)
      .mockReturnValueOnce('6130176e-46d6-41d4-b88a-fbe2e55ff7a5')
      .mockReturnValueOnce('3fe3c3a9-9dae-4999-b70a-5cb8c55a310f');

    jest.spyOn(db.bots, 'countDocuments').mockImplementation((criteria: any): any => {
      expect(criteria).toEqual({
        vkGroupId: 12345,
      });

      return Promise.resolve(2);
    });

    const expectedError = new Error('Can\'t create several bots in one group');

    try {
      await handler({
        params: {
          code: 'e90bcd5bd8ae4330b97e02a2158da16357c79b31a1c0458e81766c69af0d9963',
          state: 'b6a6d7cc-1a15-4a2f-a018-70175d058966',
        },
      });
    } catch (e) {
      expect(e).toEqual(expectedError);
    }
  });
});
