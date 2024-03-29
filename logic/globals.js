/*jshint esversion: 6 */

var globals = {};

globals.coinsymbol = "BTC/USDT";
globals.coinarg = globals.coinsymbol;
globals.coin = globals.coinarg.split("/");
globals.coinpair = globals.coin[0] + globals.coin[1];

globals.profitPercent = 0.01;
globals.profitMultiplier = 1;
globals.profitTarget = globals.profitPercent * globals.profitMultiplier;

globals.stopLossPercent = 0.005;
globals.stopLossMultiplier = 1;
globals.stopLossTarget = globals.stopLossPercent * globals.stopLossMultiplier;

globals.trailingStopLossPercent = 0.0025;
globals.trailingStopLossMultiplier = 1;
globals.trailingStopLossTarget =
  globals.trailingStopLossPercent * globals.trailingStopLossMultiplier;

globals.buyPrice = 0;
globals.sellPrice = 0;
globals.profitRecord = 0;

module.exports = globals;
