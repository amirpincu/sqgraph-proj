const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
   branches: store.collection('branches'),
   clients: store.collection('clients'),
   transactions: store.collection('transactions')
};