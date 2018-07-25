/*jshint esversion: 6 */

const binance = require("node-binance-api")();
const globals = require("./globals.js");
const getPrice = require("./prices.js");

var loss = {};

loss.check = (listedPrice, stopLossTarget) => {
  let stopLossPrice = globals.buyPrice - globals.buyPrice * stopLossTarget;
  console.log("stoploss: " + stopLossPrice);

  if (listedPrice <= stopLossPrice) {
    console.warn("Stop loss triggered");
  }
};

module.exports = loss;
