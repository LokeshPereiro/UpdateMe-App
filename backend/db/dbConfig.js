import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const dbConnection = (mongo_uri) => {
  return mongoose.connect(
    mongo_uri,
    console.log("~Connected to Mongodb Atlas/Compass Successfully..")
  );
};

// mongoose
//   .connect(connectionURL)
//   .then(() => console.log("~Connected to Mongodb Atlas Successfully..."))
//   .catch((err) => console.log(err));
