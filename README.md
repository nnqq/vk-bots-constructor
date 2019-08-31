# vk-bots-constructor

This project is VK.com bots constructor backend app. It's like a simplified [robochat.io](https://robochat.io)

Built with: TypeScript, Node.js microservices, NATS as message broker, MongoDB, and Hapi.js as web-framework

## Run dev environment

First of all, you should read `eco/ecosystem.config.js` file and paste some VK app data and webhook url to environment variables

Well. You need to start NATS and MongoDB

```
docker-compose up -d
```

Install all dependencies and let PM2 to work with TypeScript

```
npm i
```

Start microservices with PM2

```
npm start
```

Open http://0.0.0.0:4000/api/docs and watch for api documentation. Enjoy!

## Contact author

[Telegram](https://t.me/aveDenis)
