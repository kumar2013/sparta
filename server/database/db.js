var Sequelize = require('sequelize');


var connection = new Sequelize('db', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './database/db.sqlite'
});

var Bet = connection.define('bet', {
  poolType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  runner: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stake: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

var Result = connection.define('result', {
  first: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  second: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  third: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

var Commission = connection.define('commission', {
  poolType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fee: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

connection.sync({force: true}).then(function() {
  console.log('Database is ready!');
  Commission.bulkCreate([
    {poolType: 'win', fee: 15},
    {poolType: 'place', fee: 12},
    {poolType: 'exact', fee: 18},
    {poolType: 'quinella', fee: 18}
  ]);
});


module.exports = connection;
