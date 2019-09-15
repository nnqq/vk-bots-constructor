import { handler } from './index';
import { db } from '../../database';
import { botFather } from '../../helpers/BotFather';
import { handler as refreshBot } from '../refreshBot';

jest.mock('../refreshBot');

describe('Should edit Bot', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const updateOneMock = jest.spyOn(db.bots, 'updateOne').mockImplementation((query, doc): any => {
    expect(query).toEqual({
      botId: 'a971a5d8-6225-49ab-9ab7-e53f410c9eb9',
    });

    expect(doc).toEqual({
      isEnabled: true,
    });

    return {
      nModified: 1,
    };
  });

  const killBotMock = jest.spyOn(botFather, 'killBot').mockImplementation((params) => {
    expect(params).toEqual({
      botId: 'a971a5d8-6225-49ab-9ab7-e53f410c9eb9',
    });
  });

  test('Successfully enable Bot', async () => {
    const response = {
      updatedCount: 1,
    };

    const result = await handler({
      params: {
        botId: 'a971a5d8-6225-49ab-9ab7-e53f410c9eb9',
        isEnabled: true,
      },
    });

    expect(updateOneMock).toBeCalled();

    expect(refreshBot).toBeCalledWith({
      params: {
        botId: 'a971a5d8-6225-49ab-9ab7-e53f410c9eb9',
      },
    });

    expect(killBotMock).not.toBeCalled();

    expect(result).toEqual(response);
  });

  test('Successfully disable Bot', async () => {
    const updateOneFalseMock = jest.spyOn(db.bots, 'updateOne').mockImplementation((query, doc): any => {
      expect(query).toEqual({
        botId: 'a971a5d8-6225-49ab-9ab7-e53f410c9eb9',
      });

      expect(doc).toEqual({
        isEnabled: false,
      });

      return {
        nModified: 1,
      };
    });

    const response = {
      updatedCount: 1,
    };

    const result = await handler({
      params: {
        botId: 'a971a5d8-6225-49ab-9ab7-e53f410c9eb9',
        isEnabled: false,
      },
    });

    expect(updateOneFalseMock).toBeCalled();

    expect(refreshBot).not.toBeCalled();

    expect(killBotMock).toBeCalled();

    expect(result).toEqual(response);
  });
});
