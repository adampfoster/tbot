/*jshint esversion: 6 */

const binance = require("node-binance-api")();
const globals = require("./globals.js");

var orders = {};

orders.getAll = pair => {
  binance.openOrders(false, (error, openOrders) => {
    if (openOrders.length == 0) {
      console.log("You have no open orders bud");
    } else {
      console.log("openOrders()", openOrders);
    }
  });
};

module.exports = orders;
