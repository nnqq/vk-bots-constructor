// https://oauth.vk.com/authorize?client_id=7061121&display=page&redirect_uri=https://c64221bc.ngrok.io/api/users/register&scope=groups,offline&response_type=code&v=5.101

// https://oauth.vk.com/authorize?client_id=7061121&display=page&redirect_uri=http://127.0.0.1:4000/api/bots/create&group_ids=184683671&scope=messages,manage&response_type=code&v=5.101

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
        DOMAIN: 'https://ff73cd9c.ngrok.io',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
