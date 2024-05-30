const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js"); // Ensure correct path to the Listing model

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error:", err); // Log the actual error
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust', { useNewUrlParser: true, useUnifiedTopology: true });
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj) => ({...obj , ower: "6628f7e2ede44e2bc59c8a3f"}));
    console.log(initData.data)
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDB();



