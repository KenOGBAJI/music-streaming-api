const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/test", {
//   useNewUrlParser: true,
// });

// module.exports;

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(process.env.DB, connectionParams);
    console.log("connected to database successfully");
  } catch (error) {
    console.log("could not connect to database");
  }
};
