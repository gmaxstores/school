const dotenv = require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;

let db;

const connectToDatabase = (callback) => {
  if (db) {
    console.log('Db is already initialized!');
    return callback(null, db);
  }
  MongoClient.connect(process.env.DATABASE_URL)
    .then((client) => {
      db = client;
      callback(null, db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDataBase = () => {
  if (!db) {
    throw Error('Db not initialized');
  }
  return db;
};

module.exports = { connectToDatabase, getDataBase }