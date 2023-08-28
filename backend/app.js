const express = require("express");
const cors = require('cors');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();


require("./db/conn");
const PORT = process.env.PORT;

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(require("./routers/auth"));


app.get('/', (req, res) => {
    res.send("hello hiya");
});

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
})