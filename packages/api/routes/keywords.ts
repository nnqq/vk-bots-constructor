import { ServerRoute } from '@hapi/hapi';
import Joi from '@hapi/joi';
import { controllers } from '../controllers/keywords';
import { RULES } from '../constants';

export const keywordsRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/keywords',
    options: {
      tags: ['api', 'keywords'],
      description: 'Create new Keyword',
      handler: controllers.createKeyword,
      auth: {
        strategy: 'accessBot',
      },
      validate: {
        query: {
          botId: Joi.string().required(),
        },
        payload: {
          triggers: Joi.array().items(Joi.string().required()).required(),
          rule: Joi.string().valid(RULES).default(RULES[0]),
          caseSensitive: Joi.boolean().default(false),
          message: Joi.string().required(),
          isEnabled: Joi.boolean().default(true),
        },
      },
    },
  },

  {
    method: 'GET',
    path: '/keywords',
    options: {
      tags: ['api', 'keywords'],
      description: 'Get Keywords list of a Bot',
      handler: controllers.getKeywords,
      auth: {
        strategy: 'accessBot',
      },
      validate: {
        query: Joi.object({
          botId: Joi.string(),
          triggers: Joi.string(),
          rule: Joi.string().valid(RULES),
          caseSensitive: Joi.boolean(),
          message: Joi.string(),
          isEnabled: Joi.boolean(),
          count: Joi.number().min(1).max(100).default(100),
          offset: Joi.number().min(0).default(0),
        }).requiredKeys('botId'),
      },
    },
  },

  {
    method: 'PATCH',
    path: '/keywords',
    options: {
      tags: ['api', 'keywords'],
      description: 'Edit Keyword of a Bot',
      handler: controllers.editKeyword,
      auth: {
        strategy: 'accessBot',
      },
      validate: {
        query: {
          botId: Joi.string().required(),
        },
        payload: Joi.object({
          keywordId: Joi.string(),
          triggers: Joi.array().items(Joi.string().required()),
          rule: Joi.string().valid(RULES),
          caseSensitive: Joi.boolean(),
          message: Joi.string(),
          isEnabled: Joi.boolean(),
        }).requiredKeys('keywordId')
          .or('triggers', 'rule', 'caseSensitive', 'message', 'isEnabled'),
      },
    },
  },

  {
    method: 'DELETE',
    path: '/keywords',
    options: {
      tags: ['api', 'keywords'],
      description: 'Delete Keyword of a Bot',
      handler: controllers.deleteKeyword,
      auth: {
        strategy: 'accessBot',
      },
      validate: {
        query: {
          botId: Joi.string().required(),
        },
        payload: {
          keywordId: Joi.string().required(),
        },
      },
    },
  },
];
