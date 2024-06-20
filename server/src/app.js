const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb+srv://jitendra123:lLWfZ90oqUTA32oU@cluster0.xif9xwt.mongodb.net';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error: ', err));

// Routes
app.use('/api', apiRoutes);

// Start the server
const PORT = process.env.PORT || 5015;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

