/*jshint esversion: 6 */
console.log('Trading bot started.');

const apiconfig = require('./api/config.js');
const binance = require('node-binance-api');

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


let buyIn = (price) => {
  buyPrice = price;
  console.log('Bought for ' + buyPrice)
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

let getCoinPrice = () => {
  return new Promise((resolve, reject) => {
    binance.prices(coinpair, (error, ticker) => {
      if (error) {
        reject(error);
      } else {
        // console.log('Price of ' + coin[0] + ':', ticker[coinpair]);
        resolve(ticker[coinpair]);
      }
    });
  });
};

let getAllCoinPrices = () => {
  binance.prices((error, ticker) => {
    console.log('Showing all coin prices', ticker)
  });
};

let streamCoinPrice = () => {
  interval = 3000;
  
  setInterval(()=> {
    let lastCoinPrice = getCoinPrice();
    lastCoinPrice.then((result) => {
      console.log('lastCoinPrice: ', result);
      checkForProfit(result, profitTarget);
      checkForLoss(result, stopLossTarget);
    });
  }, interval);
};


buyIn(15.25);
streamCoinPrice();
// console.log('apiconfig', apiconfig);

binance.balance((error, balances) => {
  console.log('balances', balances);
});
