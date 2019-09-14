import { users } from '../../../users';
import { validate } from './validate';

describe('Should auth user with token and botId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Return user credentials if token+botId found in users collection', async () => {
    jest.spyOn(users, 'authAccessBot').mockImplementation((params: any) => {
      expect(params).toEqual({
        token: 'aa18bf90-aeec-41db-a674-07f5c7e4cc49',
        botId: '5dcc5715-431e-4809-9581-6e0ae3cc7b66',
      });

      return Promise.resolve({
        isValid: true,
        credentials: {
          userId: 'f8f677fe-b7f1-425c-b139-ccc8f19e0f05',
          token: 'aa18bf90-aeec-41db-a674-07f5c7e4cc49',
          vkUserAccessToken: '06d693b505564cc7a1ceebdedfa233d6c4fbdcf2807f4c9883bc0dd06e86a48c',
          vkUserId: '111333',
          botIds: ['71051b54-c204-411b-850d-3d436a86016d', '5dcc5715-431e-4809-9581-6e0ae3cc7b66'],
        },
      });
    });

    const response = {
      isValid: true,
      credentials: {
        userId: 'f8f677fe-b7f1-425c-b139-ccc8f19e0f05',
        token: 'aa18bf90-aeec-41db-a674-07f5c7e4cc49',
        vkUserAccessToken: '06d693b505564cc7a1ceebdedfa233d6c4fbdcf2807f4c9883bc0dd06e86a48c',
        vkUserId: '111333',
        botIds: ['71051b54-c204-411b-850d-3d436a86016d', '5dcc5715-431e-4809-9581-6e0ae3cc7b66'],
      },
    };

    const result = await validate(({
      query: {
        botId: '5dcc5715-431e-4809-9581-6e0ae3cc7b66',
      },
    } as any), 'aa18bf90-aeec-41db-a674-07f5c7e4cc49');

    expect(result).toEqual(response);
  });

  test('Fail auth without botId', async () => {
    const response = {
      isValid: false,
      credentials: {},
    };

    const result = await validate(({} as any), 'aa18bf90-aeec-41db-a674-07f5c7e4cc49');

    expect(result).toEqual(response);
  });

  test('Fail auth when botId is array', async () => {
    const expectedError = new Error('BotId can\'t be an Array, it should be a String');

    try {
      await validate(({
        query: {
          botId: ['af232ec8-5bb9-4512-a0c2-a16061b6e008', '30ef667b-f2a0-46f7-9d1e-b87835860519'],
        },
      } as any), 'aa18bf90-aeec-41db-a674-07f5c7e4cc49');
    } catch (e) {
      expect(e).toEqual(expectedError);
    }
  });
});
