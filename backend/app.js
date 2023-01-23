const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config({path: "./config.env"});

require("./db/conn");
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(require("./routers/auth"));


app.get('/', (req, res) => {
    res.send("hello hiya");
});

app.listen(PORT , () => {
    console.log(`server is running at ${PORT}`);
})