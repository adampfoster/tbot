/*jshint esversion: 6 */

const getPrice = require("./prices.js");
const binance = require("node-binance-api")();

var sell = {};

sell.market = (pair, quantity) => {
  console.log("pair", pair);
  console.log("quantity", quantity);
  let preSellPrice;
  let postSellPrice;

  getPrice.coin(pair).then(price => {
    preSellPrice = price * 1;
    console.log("Pre buy price " + preSellPrice);
  });

  binance.marketSell(pair, quantity, (error, response) => {
    if (error) {
      console.log("Market Sell error", error);
    }
    console.log("Market Sell response", response);
    console.log("order id: " + response.orderId);
    // Now you can limit sell with a stop loss, etc.
    getPrice.coin(pair).then(price => {
      postSellPrice = price * 1;
      console.log("Post buy price " + postSellPrice);
      avgBuyPrice = (preSellPrice + postSellPrice) / 2;
      console.log("Avg buy price " + avgBuyPrice);
    });
  });
};

module.exports = sell;
