const { MongoClient } = require("mongodb");

// Implements CRUD routines on database
function myDB() {
  const mydb = {};

  const url = process.env.MONGO_URL || "mongodb://localhost:27017";
  const DB_NAME = "mydb";

  mydb.getShade = async (query) => {
    console.log("In mydb.getShade");
    let client;
    let skintone = {};
    try {
      // Connect to the db
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to db: ", DB_NAME);
      await client.connect();
      console.log("Connected!");
      // Connect to the collection
      const db = client.db(DB_NAME);
      const skintoneCol = db.collection("skintones");
      console.log("Collection ready, querying with ", query);
      // Query the collection
      skintone = await skintoneCol.find(query).toArray();
      console.log("Got skintone", skintone);
      return skintone;
    } catch (e) {
      console.log(e);
    } finally {
      console.log("closing the connection");
      client.close();
    }
  };

  mydb.createShade = async (shade) => {
    let client;
    try {
      // Connect to the db
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to db: ", DB_NAME);
      await client.connect();
      console.log("Connected");
      // Connect to the collection
      const db = client.db(DB_NAME);
      const skintoneCol = db.collection("skintones");
      // Create new entry in collection
      console.log("Ready to insert ", shade);
      const sort = { id: -1 };
      const last = await skintoneCol.find().sort(sort).limit(1).toArray();
      const newSkintone = {
        id: last[0].id + 1,
        r: shade.r,
        g: shade.g,
        b: shade.b,
      };
      const res = await skintoneCol.insertOne(newSkintone);
      return res;
    } catch (e) {
      console.log(e);
    } finally {
      console.log("closing the connection");
      client.close();
    }
  };
  return mydb;
}
module.exports = myDB();
