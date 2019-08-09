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
        payload: {
          botId: Joi.string().required(),
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
          count: Joi.number().min(0).max(100).default(100),
          offset: Joi.number().min(0).default(0),
        }).requiredKeys('botId'),
      },
    },
  },

  {
    method: 'PUT',
    path: '/keywords',
    options: {
      tags: ['api', 'keywords'],
      description: 'Edit Keyword of a Bot',
      handler: controllers.editKeyword,
      auth: {
        strategy: 'accessBot',
      },
      validate: {
        payload: Joi.object({
          botId: Joi.string(),
          keywordId: Joi.string(),
          triggers: Joi.array().items(Joi.string().required()),
          rule: Joi.string().valid(RULES),
          caseSensitive: Joi.boolean(),
          messsage: Joi.string(),
          isEnabled: Joi.boolean(),
        }).requiredKeys('botId', 'keywordId')
          .or('triggers', 'rule', 'caseSensitive', 'messsage', 'isEnabled'),
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
        payload: {
          botId: Joi.string().required(),
          keywordId: Joi.string().required(),
        },
      },
    },
  },
];
