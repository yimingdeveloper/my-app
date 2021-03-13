const MongoClient = require("mongodb");

// Implements CRUD routines on database
function myDB() {
  const mydb = {};

  const url = "mongodb://localhost:27017";
  const DB_NAME = "ColorMatcher";

  mydb.getShade = async (query) => {
    let client;
    try {
      // Connect to the db
      client = new MongoClient(url);
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected");
      // Connect to the collection
      const db = client.db(DB_NAME);
      const shadeCol = db.collection("shades");
      console.log("Collection ready, querying with ", query);
      // Query the collection
      const shade = await shadeCol.find(query).toArray();
      console.log("Got shade", shade);
      return shade;
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
      client = new MongoClient(url);
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected");
      // Connect to the collection
      const db = client.db(DB_NAME);
      const shadeCol = db.collection("shades");
      // Create new entry in collection
      console.log("Collection ready, inserting ", shade);
      const res = await shadeCol.insertOne(shade);
      console.log("Inserted ", res);
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
