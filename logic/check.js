/*jshint esversion: 6 */

const binance = require("node-binance-api")();

var check = {};

check.order = (orderid, pair) => {
  binance.orderStatus(pair, orderid, (error, orderStatus, symbol) => {
    console.log(symbol + " order status: ", orderStatus);
  });
};

check.trade = (pair, orderId) => {
  binance.trades(pair, (error, trades, symbol) => {
    // console.log(symbol + 'trade history ', trades);
    // console.log('Number of trades: ', trades.length);
    trades.map(trade => {
      if (trade.orderId == orderId) console.log("order trades ", trade);
    });
  });
};

module.exports = check;
