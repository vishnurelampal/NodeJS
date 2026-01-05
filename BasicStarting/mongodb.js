const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://vishnurelampal_db_user:hvy83gF2KqhoO2hC@startingmongodb.tp0wder.mongodb.net/";
const client = new MongoClient(url);
const dbName = "HelloDatabase";
const newData = { name: "Gowri", age: 22 };
async function getDataFromDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    const collection = db.collection("name");
    const insertResult = await collection.insertMany([newData]);
    console.log("Inserted documents =>", insertResult);
  } catch (err) {
    console.error("Connection error:", err);
    return;
  }
}

getDataFromDB()
  .then(console.log())
  .catch(console.error)
  .finally(() => client.close());
//
