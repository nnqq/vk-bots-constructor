// https://oauth.vk.com/authorize?client_id=7061121&display=page&redirect_uri=http://c461df82.ngrok.io/api/users/register&scope=groups,offline&response_type=code&v=5.101

module.exports = {
  apps: [
    {
      name: 'api',
      script: './packages/api/server.js',
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
      script: './packages/users/server.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
        CLIENT_ID: 7061121,
        CLIENT_SECRET: 'LnocvOU3wXmCOCBRbXUl',
        REDIRECT_URI: 'http://c461df82.ngrok.io/api/users/register',
        MONGO_URI: 'mongodb://localhost:27017/vkbc',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'bots',
      script: './packages/bots/server.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
