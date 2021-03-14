const MongoClient = require("mongodb");

// Implements CRUD routines on database
function myDB() {
  const mydb = {};

  const url = "mongodb://localhost:27017";
  const DB_NAME = "mydb";

  mydb.getShade = async () => {
    console.log("In mydb.getShade");
    let client;
    let skintone = "This will be a skintone";
    try {
      // Connect to the db
      client = new MongoClient(url);
      console.log("Connecting to db: ", DB_NAME);
      await client.connect();
      console.log("Connected");
      // Connect to the collection
      const db = client.db(DB_NAME);
      const skintoneCol = db.collection("skintones");
      //console.log("Collection ready, querying with ", query);
      console.log("Connected to collection ", skintoneCol);
      // Query the collection
      //const skintone = await skintoneCol.find(query).toArray();
      //console.log("Got skintone", skintone);
      //return skintone;
    } catch (e) {
      console.log(e);
    } finally {
      console.log("closing the connection");
      client.close();
    }
    return skintone;
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
    return "CREATED SHADE";
  };
  return mydb;
}
module.exports = myDB();
