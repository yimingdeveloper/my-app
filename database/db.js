const { MongoClient } = require("mongodb");

// Imports DB admin credentials and connects to MongoDB Atlas (Comment out if deploying to Heroku or serving MongoDB locally)
const dotenv = require("dotenv");
dotenv.config();
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ux7qi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Implements CRUD routines on database
function myDB() {
  const mydb = {};

  //const url = process.env.MONGODB_URI || "mongodb://localhost:27017"; (Uncomment if serving MongoDB locally or deploying to Heroku)
  const DB_NAME = "mydb";

  mydb.getShade = async (query) => {
    console.log("In mydb.getShade");
    let client;
    try {
      // Connect to the db
      client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connecting to db: ", DB_NAME);
      await client.connect();
      console.log("Connected!");
      // Connect to the collection
      const db = client.db(DB_NAME);
      const skintonesCol = db.collection("skintones");
      console.log("Collection ready, querying with ", query);
      // Query the collection
      const shade = await skintonesCol.find({ id: 1 }).toArray();
      console.log("Got skintone", shade);
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
      client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
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
