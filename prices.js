/*jshint esversion: 6 */

const binance = require("node-binance-api")();
const globals = require("./globals.js");
const profit = require("./profit.js");
const loss = require("./loss.js");

const prices = {};

prices.coin = pair => {
  return new Promise((resolve, reject) => {
    binance.prices(pair, (error, ticker) => {
      if (error) {
        reject(error);
      } else {
        // console.log('Price of ' + coin[0] + ':', ticker[coinpair]);
        resolve(ticker[pair]);
      }
    });
  });
};

(prices.all = () => {
  binance.prices((error, ticker) => {
    console.log("Showing all coin prices", ticker);
  });
}),
  (prices.stream = pair => {
    interval = 3000;

    setInterval(() => {
      let lastCoinPrice = prices.coin(pair);
      lastCoinPrice.then(result => {
        console.log("lastCoinPrice: ", result);
        profit.check(result, globals.profitTarget);
        loss.check(result, globals.stopLossTarget);
      });
    }, interval);
  });

module.exports = prices;
