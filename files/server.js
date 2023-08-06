const Koa = require('koa');
const serve = require('koa-static');
const Cors = require('@koa/cors');

const app = new Koa();
app.use(Cors({
  credentials: true,
}));
app.use(serve('./public'));


app.listen(3003);