<<<<<<< HEAD
=======
//const MongoClient = require("mongodb");
>>>>>>> BackEnd

// Implements CRUD routines on database
function myDB() {
  const mydb = {};
<<<<<<< HEAD
  let found = false;

  // const url = "mongodb://localhost:27017";
  // const DB_NAME = "ColorMatcher";

  mydb.getShade = async () => {
    // console.log("In mydb.getShade");
    // let client;
    // try {
    //   // Connect to the db
    //   client = new MongoClient(url);
    //   console.log("Connecting to the db");
    //   await client.connect();
    //   console.log("Connected");
    //   // Connect to the collection
    //   const db = client.db(DB_NAME);
    //   const shadeCol = db.collection("shades");
    //   //console.log("Collection ready, querying with ", query);
    //   console.log("Connected to collection ", shadeCol);
    //   // Query the collection
    //   const shade = "Pretend this is a shade"; //await shadeCol.find(query).toArray();
    //   console.log("Got shade", shade);
    //   return shade;
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   console.log("closing the connection");
    //   client.close();
    // }
    if (!found) {
      return "SHADE NOT FOUNDDD";
    }
    return "BACK-END JS CONNECTED TO FRONT-END JS";
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
    //   const shadeCol = db.collection("shades");
    //   // Create new entry in collection
    //   console.log("Collection ready, inserting ", shade);
    //   const res = await shadeCol.insertOne(shade);
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

=======
  let found = false;

  // const url = "mongodb://localhost:27017";
  // const DB_NAME = "ColorMatcher";

  mydb.getShade = async () => {
    // console.log("In mydb.getShade");
    // let client;
    // try {
    //   // Connect to the db
    //   client = new MongoClient(url);
    //   console.log("Connecting to the db");
    //   await client.connect();
    //   console.log("Connected");
    //   // Connect to the collection
    //   const db = client.db(DB_NAME);
    //   const shadeCol = db.collection("shades");
    //   //console.log("Collection ready, querying with ", query);
    //   console.log("Connected to collection ", shadeCol);
    //   // Query the collection
    //   const shade = "Pretend this is a shade"; //await shadeCol.find(query).toArray();
    //   console.log("Got shade", shade);
    //   return shade;
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   console.log("closing the connection");
    //   client.close();
    // }
    if (!found) {
      return "SHADE NOT FOUNDDD";
    }
    return "BACK-END JS CONNECTED TO FRONT-END JS";
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
    //   const shadeCol = db.collection("shades");
    //   // Create new entry in collection
    //   console.log("Collection ready, inserting ", shade);
    //   const res = await shadeCol.insertOne(shade);
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
>>>>>>> BackEnd
