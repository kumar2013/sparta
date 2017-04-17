var restify  = require('restify');

var Betting  = require('./Betting.js');
var Dividend = require('./Dividend.js');

var server   = restify.createServer();
var io       = require('socket.io')(server.server);


var socket = io.on('connection', function(socket) {
  socket.on('sendPoolsData', function() {
    Betting.updatePools()
    .then(function(data) {
      socketSendPoolsData(data);
    });
  });
  
  socket.on('sendDividends', function() {
    Betting.getResult()
    .then(function(value) {
      if (value.length > 0) {
        Dividend.calculate(value[0], socketSendDividends);
      }
    });
  });
  
  socket.on('sendResults', function() {
    Betting.getResult()
    .then(function(value) {
      if (value.length > 0) {
        socketSendResults(value[0]);
      }
    });
  });
  
  socket.on('reset', function() {
    Betting.reset()
    .then(function() {
      socketSendDividends(null);
      socketSendResults(null);
    });
  });
  
  return socket;
});

function socketSendPoolsData(data) {
  socket.emit('poolsResult', data);
}

function socketSendDividends(data) {
  socket.emit('dividends', data);
}

function socketSendResults(data) {
  socket.emit('bettingResults', data);
}

server.use(restify.bodyParser());
server.use(restify.CORS());

server.get('/', function(req, res, next) {
  res.send('hello world!');
  next();
});

server.post('/betting', function(req, res, next) {
  Betting.placeBet(req.body)
  .then(function(data) {
    socketSendPoolsData(data);
  });
  
  res.send(200);
  next();
});

server.post('/set-result', function(req, res, next) {
  socketSendResults(JSON.parse(req.body));
  Betting.setResult(req.body, socketSendDividends);
  
  res.send(200);
  next();
});

server.post('/interest', function(req, res, next) {
  Betting.setInterest(req.body);
  
  res.send(200);
  next();
});

server.listen(8000, function() {
  console.log('server is listening at http://localhost:8000');
});
