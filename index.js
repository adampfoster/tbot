/*jshint esversion: 6 */

console.log('Trading bot started.');

const apiconfig = require('./api/config.js');
const binance = require('node-binance-api');
const buy = require('./buy.js');

binance.options({
  APIKEY: apiconfig.APIKEY,
  APISECRET: apiconfig.APISECRET,
  useServerTime: apiconfig.useServerTime, // If you get timestamp errors, synchronize to server time at startup
  test: apiconfig.test // If you want to use sandbox mode where orders are simulated
});

const coinsymbol = "BNB/USDT";
const coinarg = coinsymbol;
const coin = coinarg.split('/');
const coinpair = coin[0] + coin[1];

const profitPercent = .01;
const profitMultiplier = 1;
const profitTarget = profitPercent * profitMultiplier;

const stopLossPercent = .005;
const stopLossMultiplier = 1;
const stopLossTarget = stopLossPercent * stopLossMultiplier;

const trailingStopLossPercent = .0025;
const trailingStopLossMultiplier = 1;
const trailingStopLossTarget = trailingStopLossPercent * trailingStopLossMultiplier;

let buyPrice;
let sellPrice;
let profitRecord;

console.log('coinarg: ', coinarg);

let marketSell = (pair, quantity) => {
  // buyPrice = price;
  // console.log('Sold for ' + buyPrice)
  binance.marketSell(pair, quantity, (error, response) => {
    if (error) {
      console.log("Market Sell error", error);
    }
    console.log("Market Sell response", response);
    console.log("order id: " + response.orderId);
    // Now you can limit sell with a stop loss, etc.
  });
};

let checkOrder = (orderid, pair) => {
  binance.orderStatus(pair, orderid, (error, orderStatus, symbol) => {
    console.log(symbol + ' order status: ', orderStatus);
  });
};

let checkTrade = (pair, orderId) => {
  binance.trades(pair, (error, trades, symbol) => {
    // console.log(symbol + 'trade history ', trades);
    // console.log('Number of trades: ', trades.length);
    trades.map((trade) => {
      if (trade.orderId == orderId)
      console.log('order trades ', trade);
    })
  });
};

let sellOut = (price) => {
  sellPrice = price;
  console.log('Sold for ' + sellPrice)
};

let setNewProfitRecord = (listedPrice) => {
  if (listedPrice > profitRecord) {
    console.log('Setting a new profit record of: ', listedPrice);
    profitRecord = listedPrice;
  }
};

let setTrailingStopLoss = (listedPrice) => {
  let interval = 1000 * 10; // Try not to get banned by placing and cancelling orders too much

  setNewProfitRecord(listedPrice);

  setInterval(()=> {
    newProfitRecord(listedPrice);
  }, interval);
};

let checkForProfit = (listedPrice, profitTarget) => {
  let profitTargetPrice = buyPrice * (1 + (profitTarget));
  console.log('profit: ', profitTargetPrice);

  if (listedPrice >= profitTargetPrice) {
    console.log('Profit target reached');
    setTrailingStopLoss(listedPrice);
  }
};

let checkForLoss = (listedPrice, stopLossTarget) => {
  let stopLossPrice = buyPrice - (buyPrice * (stopLossTarget));
  console.log('stoploss: ' + stopLossPrice);

  if (listedPrice <= stopLossPrice) {
    console.warn('Stop loss triggered');
  }
};

let checkForProfitLoss = (listedPrice, trailingStopLossTarget) => {
  let trailingStopLossPrice = buyPrice - (buyPrice * (trailingStopLossTarget));
  console.log('trailingStoploss: ' + trailingStopLossPrice);

  if (listedPrice <= trailingStopLossPrice) {
    console.warn('Trailing stop loss triggered');
  }
};

buy.market(coinpair, 1);
// marketSell(coinpair, 5);
// checkOrder(36661989, 'BNBUSDT');
// checkTrade('BNBUSDT', 36661989);
// streamCoinPrice();
