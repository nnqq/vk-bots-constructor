// https://oauth.vk.com/authorize?client_id=7061121&display=page&redirect_uri=http://127.0.0.1:4000/api/users/register&scope=groups,offline&response_type=code&v=5.101

// https://oauth.vk.com/authorize?client_id=7061121&display=page&redirect_uri=http://127.0.0.1:4000/api/bots/create&group_ids=184683671&scope=messages,manage&response_type=code&v=5.101&state=c600d005-0d6b-4890-8fc2-edff2076ee51

module.exports = {
  apps: [
    {
      name: 'api',
      script: './packages/api/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        NATS_URI: 'nats://localhost:4222',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },

    {
      name: 'users',
      script: './packages/users/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        CLIENT_ID: 7061121,
        CLIENT_SECRET: 'LnocvOU3wXmCOCBRbXUl',
        REDIRECT_URI: 'http://127.0.0.1:4000/api/users/register',
        MONGO_URI: 'mongodb://localhost:27017/vkbc-users',
        NATS_URI: 'nats://localhost:4222',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },

    {
      name: 'bots',
      script: './packages/bots/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        CLIENT_ID: 7061121,
        CLIENT_SECRET: 'LnocvOU3wXmCOCBRbXUl',
        REDIRECT_URI: 'http://127.0.0.1:4000/api/bots/create',
        MONGO_URI: 'mongodb://localhost:27017/vkbc-bots',
        DOMAIN: 'https://337118a4.ngrok.io',
        NATS_URI: 'nats://localhost:4222',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },

    {
      name: 'events',
      script: './packages/events/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        MONGO_URI: 'mongodb://localhost:27017/vkbc-events',
        NATS_URI: 'nats://localhost:4222',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },

    {
      name: 'keywords',
      script: './packages/keywords/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        MONGO_URI: 'mongodb://localhost:27017/vkbc-keywords',
        NATS_URI: 'nats://localhost:4222',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
