const dotenv = require("dotenv");

dotenv.config();
const { MongoClient } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1/localdev";

let mongodb;

exports.getMongodb = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(connectionURL)
      .then((client) => {
        mongodb = client.db();
        console.log("Database Connected");
        resolve(mongodb);
      })
      .catch((err) => {
        console.log("dberror****", err);
        reject(err);
      });
  });
};
