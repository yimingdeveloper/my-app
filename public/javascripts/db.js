var { MongoClient } = require("mongodb");

function myDB() {
  const mydb = {};

  const url = "mongodb://localhost:27017";
  const DB_NAME = "myFiles";

  mydb.getFiles = async (query = {}) => {
    let client;

    try {
      client = new MongoClient(url);

      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected");

      const db = client.db(DB_NAME);
      const filesCol = db.collection("files");

      const query = {};
      const files = await filesCol.find(query).toArray();
      console.log("Got files", files);
    } finally {
      console.log("closing the connection");
      client.close();
    }
  };
  return mydb;
}
module.exports = myDB();
