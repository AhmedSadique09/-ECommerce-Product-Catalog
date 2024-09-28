const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create the express app
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://devahmed09:%40ahmed123@cluster0.su0sq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  
// Define the product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

// Create the product model
const Product = mongoose.model('Product', productSchema);

// RESTful API routes
// Get all products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a new product
app.post('/api/products', async (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = new Product({ name, price, description });
  await newProduct.save();
  res.json(newProduct);
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });
  res.json(updatedProduct);
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ message: 'Product deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
