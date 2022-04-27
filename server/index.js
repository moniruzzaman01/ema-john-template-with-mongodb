const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pr56l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const productCollection = client
      .db("ema-john-template")
      .collection("products");
    //get all data
    app.get("/products", async (req, res) => {
      const pageNumber = parseInt(req.query.pageNumber);
      const productPerPage = parseInt(req.query.productPerPage);
      const cursor = productCollection.find({});
      const products = await cursor
        .skip(pageNumber * productPerPage)
        .limit(productPerPage)
        .toArray();
      res.send(products);
    });

    //get number of data
    app.get("/numberOfData", async (req, res) => {
      const number = await productCollection.estimatedDocumentCount();
      res.send({ number });
    });
    app.post("/productsById", async (req, res) => {
      const keys = req.body;
      // const ids = keys.map((id) => ObjectId(id));
      const query = { _id: { $in: keys } };
      console.log("keys", keys);
      const cursor = productCollection.find({});
      const products = await cursor.toArray();
      res.send(products);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

//default calls

app.get("/", (req, res) => {
  res.send("working");
});
app.listen(port, () => {
  console.log("listening from", port);
});
