var _  = require('lodash');
var db = require('./database/db.js');
var Utility = require('./Utility.js');
var Dividend = require('./Dividend.js');


function placeBet(value) {
  var bet = JSON.parse(value);
    
  return db.models.bet.create({
    poolType: bet.poolType,
    runner: bet.runner,
    stake: bet.stake
  })
  .then(updatePools);
}

function updatePools() {
  return fetchBets()
  .then(calculateSum)
  .then(constructPoolData);
}

function fetchBets() {
  return db.models.bet.findAll({
    attributes: ['poolType','stake']
  })
  .then(Utility.convertToArray);
}

function calculateSum(values) {
  return _(values).groupBy('poolType').map(function(value, key) {
    return {
      poolType: key,
      stake: _.sumBy(value, 'stake')
    };
  }).value();
}

function constructPoolData(value) {
  var result = {};

  value.forEach(function(value) {
    result[value.poolType] = value.stake;
  });
  
  return result;
}

function setResult(value, next) {
  var winners = JSON.parse(value);
 
  return db.models.result.destroy({
    where: {},
    truncate: true
  })
  .then(function() {
    return db.models.result.create({
      first: winners.first,
      second: winners.second,
      third: winners.third
    })
    .then(Dividend.calculate(winners, next));
  });
}

function getResult() {
  return db.models.result.findAll({
    attributes: ['first','second', 'third']
  })
  .then(Utility.convertToArray);
}

function setInterest(value) {
  var interest = JSON.parse(value);
  
  return db.models.commission.destroy({
    where: {},
    truncate: true
  })
  .then(function() {
    return db.models.commission.bulkCreate([
      {poolType: 'win', fee: interest.win},
      {poolType: 'place', fee: interest.place},
      {poolType: 'exact', fee: interest.exact},
      {poolType: 'quinella', fee: interest.quinella}
    ]);
  });
}

function reset() {
  return db.models.bet.destroy({
    where: {},
    truncate: true
  })
  .then(function() {
    return db.models.result.destroy({
      where: {},
      truncate: true
    });
  })
  .then(function() {
    return db.models.commission.destroy({
      where: {},
      truncate: true
    })
    .then(function() {
      return db.models.commission.bulkCreate([
        {poolType: 'win', fee: 15},
        {poolType: 'place', fee: 12},
        {poolType: 'exact', fee: 18},
        {poolType: 'quinella', fee: 18}
      ]);
    });
  });
}


module.exports = {
  placeBet: placeBet,
  updatePools: updatePools,
  setResult: setResult,
  getResult: getResult,
  setInterest: setInterest,
  reset: reset
};
