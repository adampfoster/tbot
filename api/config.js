/*jshint esversion: 6 */

const apikey = require('./apikey');
const apisecret = require('./apisecret');

exports = {
  APIKEY: apikey,
  APISECRET: apisecret,
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: true // If you want to use sandbox mode where orders are simulated
};