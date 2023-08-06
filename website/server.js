require('dotenv').config();

const mathPrototype = require('./src/prototype/mathPrototype');
const Koa = require('koa');
const Cors = require('@koa/cors');
const mongoose = require('mongoose');


const RedisIO = require("ioredis");
global.Redis = new RedisIO({
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
});
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
const router = require('./src/routes');

const app = new Koa();

app.use(Cors({
  credentials: true,
}));

app.use(router.routes());

app.listen(process.env.APP_PORT);