const express = require('express');

const AccountRouter = require('./accounts/accounts_router.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
  res.send('<h1>Accounts API</h1>');
})

module.exports = server;
