import { handler } from './index';
import { events } from '../../../events';
import { keywords } from '../../../keywords';

jest.mock('../../../events');
jest.mock('../../../keywords');

describe('Should return Bot config object', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Successfully return Bot config object, if keywords less than 100', async () => {
    const mockGetEvents = events.getEvents as jest.Mock;

    mockGetEvents.mockResolvedValue({
      botId: '4e8669a4-0a7e-44e4-8e72-93e2c3cdc66e',
      events: [{
        eventId: 'da3c3178-4a7c-437d-b4ab-3344fc8d4b26',
        trigger: 'group_join',
        message: 'welcome to the group',
        isEnabled: true,
      }, {
        eventId: 'da3c3178-4a7c-437d-b4ab-3344fc8d4b26',
        trigger: 'group_leave',
        message: 'good buy',
        isEnabled: true,
      }],
    });

    const mockGetKeywords = keywords.getKeywords as jest.Mock;

    mockGetKeywords.mockResolvedValue({
      totalCount: 2,
      count: 2,
      offset: 0,
      botId: '4e8669a4-0a7e-44e4-8e72-93e2c3cdc66e',
      keywords: [{
        keywordId: '09c2e8b3-6b89-4c39-94d3-e0ab2cc8a8e4',
        triggers: ['hi', 'hello'],
        rule: 'contain',
        caseSensitive: false,
        message: 'hi, i\'m bot',
        isEnabled: true,
      }, {
        keywordId: '09c2e8b3-6b89-4c39-94d3-e0ab2cc8a8e4',
        triggers: ['1', 'one'],
        rule: 'contain',
        caseSensitive: false,
        message: 'hi, i got message',
        isEnabled: true,
      }],
    });

    const response = {
      botId: '4e8669a4-0a7e-44e4-8e72-93e2c3cdc66e',
      events: [{
        eventId: 'da3c3178-4a7c-437d-b4ab-3344fc8d4b26',
        trigger: 'group_join',
        message: 'welcome to the group',
        isEnabled: true,
      }, {
        eventId: 'da3c3178-4a7c-437d-b4ab-3344fc8d4b26',
        trigger: 'group_leave',
        message: 'good buy',
        isEnabled: true,
      }],
      keywords: [{
        keywordId: '09c2e8b3-6b89-4c39-94d3-e0ab2cc8a8e4',
        triggers: ['hi', 'hello'],
        rule: 'contain',
        caseSensitive: false,
        message: 'hi, i\'m bot',
        isEnabled: true,
      }, {
        keywordId: '09c2e8b3-6b89-4c39-94d3-e0ab2cc8a8e4',
        triggers: ['1', 'one'],
        rule: 'contain',
        caseSensitive: false,
        message: 'hi, i got message',
        isEnabled: true,
      }],
    };

    const result = await handler({
      params: {
        botId: '4e8669a4-0a7e-44e4-8e72-93e2c3cdc66e',
      },
    });

    expect(mockGetEvents).toBeCalledWith({
      botId: '4e8669a4-0a7e-44e4-8e72-93e2c3cdc66e',
      isEnabled: true,
    });

    expect(mockGetKeywords).toBeCalledWith({
      botId: '4e8669a4-0a7e-44e4-8e72-93e2c3cdc66e',
      isEnabled: true,
      count: 100,
    });

    expect(result).toEqual(response);
  });
});
