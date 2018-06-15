/*jshint esversion: 6 */

const binance = require('node-binance-api');

var getPrice = {};

getPrice.coin = (pair) => {
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

getPrice.all = () => {
  binance.prices((error, ticker) => {
    console.log('Showing all coin prices', ticker)
  });
},

getPrice.stream = () => {
  interval = 3000;
  
  setInterval(()=> {
    let lastCoinPrice = getCoinPrice(coinpair);
    lastCoinPrice.then((result) => {
      console.log('lastCoinPrice: ', result);
      checkForProfit(result, profitTarget);
      checkForLoss(result, stopLossTarget);
    });
  }, interval);
};

module.exports = getPrice;