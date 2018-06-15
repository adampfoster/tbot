/*jshint esversion: 6 */

const binance = require('node-binance-api');
const globals = require('./globals.js');
const getPrice = require('./prices.js');

var profit = {};

profit.check = (listedPrice, profitTarget) => {
  let profitTargetPrice = globals.buyPrice * (1 + (profitTarget));
  console.log('profit: ', profitTargetPrice);

  if (listedPrice >= profitTargetPrice) {
    console.log('Profit target reached');
    profit.setTrailingStopLoss(listedPrice);
  }
};

profit.lossCheck = (listedPrice, trailingStopLossTarget) => {
  let trailingStopLossPrice = globals.buyPrice - (globals.buyPrice * (trailingStopLossTarget));
  console.log('trailingStoploss: ' + trailingStopLossPrice);

  if (listedPrice <= trailingStopLossPrice) {
      console.warn('Trailing stop loss triggered');
  }
};

profit.setNewProfitRecord = (listedPrice) => {
  if (listedPrice > profitRecord) {
    console.log('Setting a new profit record of: ', listedPrice);
    globals.profitRecord = listedPrice;
  }
};

profit.setTrailingStopLoss = (listedPrice) => {
  let interval = 1000 * 10; // Try not to get banned by placing and cancelling orders too much

  profit.setNewProfitRecord(listedPrice);

  // setInterval(()=> {
  //   newProfitRecord(listedPrice);
  // }, interval);
};

module.exports = profit;
  