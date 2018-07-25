/*jshint esversion: 6 */

const binance = require("node-binance-api")();
const getPrice = require("./prices.js");

var buy = {};

buy.market = (pair, quantity) => {
  console.log("pair", pair);
  console.log("quantity", quantity);
  let preBuyPrice;
  let postBuyPrice;

  getPrice.coin(pair).then(price => {
    preBuyPrice = price * 1;
    console.log("Pre buy price " + preBuyPrice);
  });

  binance.marketBuy(pair, quantity, (error, response) => {
    if (error) {
      console.log("Market Buy error", error);
    }
    console.log("Market Buy response", response);
    console.log("order id: " + response.orderId);
    // Now you can limit sell with a stop loss, etc.

    getPrice.coin(pair).then(price => {
      postBuyPrice = price * 1;
      console.log("Post buy price " + postBuyPrice);
      avgBuyPrice = (preBuyPrice + postBuyPrice) / 2;
      console.log("Avg buy price " + avgBuyPrice);
    });
  });
};

module.exports = buy;
