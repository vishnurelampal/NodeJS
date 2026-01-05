const mongoose = require("mongoose");
const databaseDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vishnurelampal_db_user:hvy83gF2KqhoO2hC@startingmongodb.tp0wder.mongodb.net/DevTinder"
  );
};
module.exports = databaseDB;
