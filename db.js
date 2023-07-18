const mongoose = require("mongoose");
let pass = process.env.MongoDB;
dbConnect();
async function dbConnect() {
  try {
    await mongoose.connect(pass, { useNewUrlParser: true });
    console.log("Mongo DB Connection success");
  } catch (error) {
    console.log("Mongo DB Connection failed");
  }
}

module.exports = mongoose;
