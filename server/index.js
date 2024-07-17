const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors());

const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database not connected', err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(cors()); // Add CORS middleware
app.use('/', require('./routes/authRoutes'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is running on port ' + port));
