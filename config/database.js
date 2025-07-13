const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      // console.log(`Database Connection: ${conn.connection.host}`);
      // console.log(`Database Name: ${conn.connection.name}`);
      console.log("Successfully Connected");
    })
    .catch((err) => {
      console.log(`Database Error : ${err}`);
      process.exit(1);
    });
};

module.exports = dbConnection;
