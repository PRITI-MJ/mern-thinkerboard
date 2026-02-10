const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


const notesRoutes =  require ("./notesRoutes.js");
const connectDB = require("./config/db.js");
const rateLimiter = require("./middlewares/ratelimiter.js");


dotenv.config();

//console.log("MONGO URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors({
    origin: "http://localhost:5173", //frontend URL
}));
// middleware to parse JSON bodies
//we need to add it before notesRoutes so that in notesRoutes we can access req.body (eg:- title, content)
app.use(express.json());
app.use(rateLimiter); // apply rate limiter middleware


//our simple custom middleware to log request method and url
// app.use((req, res, next) => {
//     console.log(`REQUEST METHOD  is ${req.method} and REQUEST URL is ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);


//we should start the server only after DB connection is successful
connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
})  

});


// mongodb+srv://pritimukherjee0125_db_user:A9Cc5HVBtNIvtCon@cluster0.afx4nxi.mongodb.net/?appName=Cluster0