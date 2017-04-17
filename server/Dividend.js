var _       = require('lodash');
var async   = require('async');

var db      = require('./database/db.js');
var Utility = require('./Utility.js');


function calculateDividends(winners, next) {
  getInterestRates()
  .then(function(fees) {
    var win      = _.find(fees, ['poolType', 'win']);
    var place    = _.find(fees, ['poolType', 'place']);
    var exact    = _.find(fees, ['poolType', 'exact']);
    var quinella = _.find(fees, ['poolType', 'quinella']);
    
    async.parallel({
      win: function(callback) {
        getWinDividend(winners.first, win.fee, callback);
      },
      place: function(callback) {
        getPlaceDividend(winners, place.fee, callback);
      },
      exact: function(callback) {
        getExactDividend(winners, exact.fee, callback);
      },
      quinella: function(callback) {
        getQuinellaDividend(winners, quinella.fee, callback);
      }
    }, function(err, results) {
        if (err) {
          return console.log('Error: ', err);
        }

        next(results);
    });
  });
}

function getWinDividend(winner, fee, callback) {
  getBets('win')
  .then(function(winBets) {
    if(0 > winBets.length) {
      console.log('Empty array, no bets so far!');
      callback(null, 0);
    }
    
    var winSum = _.sumBy(winBets, 'stake');
    var winWonPaid = _(winBets).filter(['runner', winner.toString()]).sumBy('stake');
    var dividend = (winSum-(winSum*(fee/100)))/(winWonPaid);
    
    callback(null, dividend.toFixed(2));
  });
}

function getPlaceDividend(winners, fee, callback) {
  getBets('place')
  .then(function(placeBets) {
    if(0 > placeBets.length) {
      console.log('Empty array, no bets so far!');
      callback(null, 0);
    }
    
    var dividend = {};
    var placeSum = _.sumBy(placeBets, 'stake');
    var winnersPortion = (placeSum-(placeSum*(fee/100)))/3;
    
    var placeWonFirstPaid = _(placeBets).filter(['runner', winners.first.toString()]).sumBy('stake');
    var placeWonSecondPaid = _(placeBets).filter(['runner', winners.second.toString()]).sumBy('stake');
    var placeWonThirdPaid = _(placeBets).filter(['runner', winners.third.toString()]).sumBy('stake');
    
    dividend.first = (winnersPortion/placeWonFirstPaid).toFixed(2);
    dividend.second = (winnersPortion/placeWonSecondPaid).toFixed(2);
    dividend.third = (winnersPortion/placeWonThirdPaid).toFixed(2);
    
    callback(null, dividend);
  });
}

function getExactDividend(winners, fee, callback) {
  getBets('exact')
  .then(function(exactBets) {
    if(0 > exactBets.length) {
      console.log('Empty array, no bets so far!');
      callback(null, 0);
    }
    
    var exactWon = _.filter(exactBets, function(value) {
      var runner = value.runner.split(',');
      if (runner[0] == winners.first && runner[1] == winners.second) {
        return value;
      }
    });
    
    var exactWonPaid = _.sumBy(exactWon, 'stake');
    var exactSum = _.sumBy(exactBets, 'stake');
    var dividend = (exactSum-(exactSum*(fee/100)))/(exactWonPaid);
    
    callback(null, dividend.toFixed(2));
  });
}

function getQuinellaDividend(winners, fee, callback) {
  getBets('quinella')
  .then(function(quinellaBets) {
    if(0 > quinellaBets.length) {
      console.log('Empty array, no bets so far!');
      callback(null, 0);
    }
    
    var quinellaWon = _.filter(quinellaBets, function(value) {
      var runner = value.runner.split(',');
      if ((runner[0] == winners.first || runner[0] == winners.second) && (runner[1] == winners.first || runner[1] == winners.second)) {
        return value;
      }
    });
    
    var quinellaWonPaid = _.sumBy(quinellaWon, 'stake');
    var quinellaSum = _.sumBy(quinellaBets, 'stake');
    var dividend = (quinellaSum-(quinellaSum*(fee/100)))/(quinellaWonPaid);
    
    callback(null, dividend.toFixed(2));
  });
}

function getBets(type) {
  return db.models.bet.findAll({
    where: {
      poolType: type
    }
  })
  .then(Utility.convertToArray);
}

function getInterestRates() {
  return db.models.commission.findAll({
    attributes: ['poolType','fee']
  })
  .then(Utility.convertToArray);
}


module.exports = {
  calculate: calculateDividends
};