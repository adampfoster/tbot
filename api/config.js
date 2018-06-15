/*jshint esversion: 6 */

const apikey = require('./apikey.js');
const apisecret = require('./apisecret.js');

const binanceoptions = {
  APIKEY: apikey,
  APISECRET: apisecret,
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: false // If you want to use sandbox mode where orders are simulated
};

module.exports = binanceoptions;