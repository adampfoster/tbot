/*jshint esversion: 6 */

console.log('Trading bot started.');

const apiconfig = require('./api/config.js');
const binance = require('node-binance-api');
const globals = require('./globals.js');
const buy = require('./buy.js');
const sell = require('./sell.js');
const profit = require('./profit.js');
const loss = require('./loss.js');
const check = require('./check.js');
const prices = require('./prices.js');

binance.options({
  APIKEY: apiconfig.APIKEY,
  APISECRET: apiconfig.APISECRET,
  useServerTime: apiconfig.useServerTime, // If you get timestamp errors, synchronize to server time at startup
  test: apiconfig.test // If you want to use sandbox mode where orders are simulated
});

// buy.market(coinpair, 1);
// sell.market(coinpair, .9);
// check.order(36661989, 'BNBUSDT');
// check.trade('BNBUSDT', 36661989);
prices.stream(globals.coinpair);
