module.exports = {
  apps: [
    {
      name: 'api',
      script: './packages/api/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        NATS_URI: 'nats://0.0.0.0:4222',
      },
    },

    {
      name: 'users',
      script: './packages/users/server.ts',
      watch: true,
      env: {
        // CLIENT_ID: '0000000', // Your VK app ID
        // CLIENT_SECRET: 'XXXXXXX', // Your VK app secret key
        NODE_ENV: 'development',
        REDIRECT_URI: 'http://0.0.0.0:4000/api/users/register',
        MONGO_URI: 'mongodb://0.0.0.0:27017/vkbc-users',
        NATS_URI: 'nats://0.0.0.0:4222',
      },
    },

    {
      name: 'bots',
      script: './packages/bots/server.ts',
      watch: true,
      env: {
        // CLIENT_ID: '0000000', // Your VK app app ID
        // CLIENT_SECRET: 'XXXXXXX', // Your VK app secret key
        // DOMAIN: 'https://XXXXX.ngrok.io', // Your webhook domain
        NODE_ENV: 'development',
        REDIRECT_URI: 'http://0.0.0.0:4000/api/bots/create',
        MONGO_URI: 'mongodb://0.0.0.0:27017/vkbc-bots',
        NATS_URI: 'nats://0.0.0.0:4222',
      },
    },

    {
      name: 'events',
      script: './packages/events/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        MONGO_URI: 'mongodb://0.0.0.0:27017/vkbc-events',
        NATS_URI: 'nats://0.0.0.0:4222',
      },
    },

    {
      name: 'keywords',
      script: './packages/keywords/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        MONGO_URI: 'mongodb://0.0.0.0:27017/vkbc-keywords',
        NATS_URI: 'nats://0.0.0.0:4222',
      },
    },
  ],
};
