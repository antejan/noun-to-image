const http = require('http');
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const moment = require('moment');
const _ = require('lodash');
const OAuth = require('oauth');

const PORT = '3000';
const app = module.exports = new koa();

const NP_KEY = 'b218272273ad46d0bc20397de529287e';
const NP_SECRET = '113404cb588347d492989054ff2678a5';

const oauth = new OAuth.OAuth(
  'http://api.thenounproject.com',
  'http://api.thenounproject.com',
  NP_KEY,
  NP_SECRET,
  '1.0',
  null,
  'HMAC-SHA1'
);



router.get('/icons/:term', function *(next) {
  console.log();

  this.body = yield new Promise((resolve, reject) => {
    oauth.get(
      'http://api.thenounproject.com' + this.req.url,
      null,
      null,
      function (e, data, res){
        resolve(data);
      }
    );
  })
});

app
  .use(serve('static'))
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) {
  app.listen(PORT);
  console.log(`listening on http://localhost:${PORT}`);
}
