const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

mongoose.connect(process.env.MONGODB_URL, 
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, })
  .then(() => { console.log('You are connected to MongoDB. Great!') })
  .catch((err) => { console.log('Connection failed...' + err) });

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const Order = mongoose.model("order", new mongoose.Schema(
    {
      _id: { type: String, default: shortid.generate },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

const User = mongoose.model("user", new mongoose.Schema(
  {
    _id: { type: String, default: shortid.generate },
    email: String,
    password: String
  }
));

//Register new user
app.post('/register', async(req, res) => {
  //Check if user already exist in the DB
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send('Email already exists');

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Register new user
  const user = new User({
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send({user: user._id});
  }
  catch (err) {
    res.status(400).send(err);
  }
})

app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Data is required." });
  }
  const order = await Order(req.body).save();
  res.send(order);
});
app.get("/api/orders", async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});
app.delete("/api/orders/:id", async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running at http://localhost:5000"));