const mongoose = require("mongoose");

const connectDB = async () => {
    try{
       await mongoose.connect(process.env.MONGO_URI);

       console.log("MONGODB CONNECTED SUCCESSFULLY!!")
    }catch(err) {
        console.error("Error connecting to MONGODB", err);
        process.exit(1); // exit with failure
    }
}

module.exports = connectDB;