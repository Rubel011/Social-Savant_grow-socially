const express = require("express");
require("dotenv").config()
const app = express();
const { connection } = require("./db")
const { userRoute } = require("./routes/userRoute")
const cors=require("cors");
const fileupload=require("express-fileupload")
const { blogRoute } = require("./routes/blogRoute");
app.use(fileupload({useTempFiles:true}))
app.use(express.json())
app.use(cors())
app.use("/users/", userRoute);
app.use("/blogs/", blogRoute);
app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log({ "msg": `server is running at port No: ${process.env.port}` });
    }
    catch (err) {
        console.log(err);
    }
})
