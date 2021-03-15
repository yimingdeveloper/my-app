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

  mydb.createShade = async () => {
    // let client;
    // try {
    //   // Connect to the db
    //   client = new MongoClient(url);
    //   console.log("Connecting to the db");
    //   await client.connect();
    //   console.log("Connected");
    //   // Connect to the collection
    //   const db = client.db(DB_NAME);
    //   const skintoneCol = db.collection("shades");
    //   // Create new entry in collection
    //   console.log("Collection ready, inserting ", shade);
    //   const res = await skintoneCol.insertOne(shade);
    //   console.log("Inserted ", res);
    //   return res;
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   console.log("closing the connection");
    //   client.close();
    // }
    return "TRUE";
  };
  return mydb;
}
module.exports = myDB();
