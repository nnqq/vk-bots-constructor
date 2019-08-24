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
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },

    {
      name: 'master-bot',
      script: './packages/master-bot/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        TOKEN: 'a936464200b93b68f05f1c43abe915dfabde606231fea46eccaa574b5ece3a071b53d2813ccba128da691',
        SECRET: 'd5f2cc39d6d34308b3565ebd7bddb7fb',
        URL_UUID: '968e3bd2-3178-4379-aaa6-3c29118d1651',
        CONFIRMATION: '6661eea2',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
