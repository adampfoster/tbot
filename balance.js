/*jshint esversion: 6 */

const binance = require('node-binance-api');
const globals = require('./globals.js');

var balance = {};

balance.getAll = () => {
  binance.balance((error, balances) => {
    // console.log("balances()", balances);
    console.log("BNB balance: ", balances.BNB.available);
    console.log("ETH balance: ", balances.ETH.available);
  });
}

module.exports = balance;