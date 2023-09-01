const express = require("express");
const cors = require('cors');
const {createHandler} = require('graphql-http/lib/use/express');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();

const adminRoute = require("./routes/admin.route");
const doctorRoute = require("./routes/doctor.route");
const patientRoute = require("./routes/patient.route");
var { graphql, buildSchema } = require("graphql");

var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

var rootValue = { hello: () => "Hello world!" }

var source = "{ hello }"


require("./db/conn");
const PORT = process.env.PORT;

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    exposedHeaders:["set-cookie"]
}));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send("hello hiya");
});

app.get('/graphql', async (req,res) => { graphql({ schema, source, rootValue }).then(response => res.send(response) )})
app.use("/api/v2/admin",adminRoute);
app.use("/api/v2/patient",patientRoute);
app.use("/api/v2/doctor",doctorRoute);

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
})