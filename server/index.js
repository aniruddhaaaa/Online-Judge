const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const problemRoutes = require('./routes/ProblemRoute');

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Update this to your frontend URL
    credentials: true,
};
app.use(cors(corsOptions));

// Database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database not connected', err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/auth', require('./controller/AuthorizationController'));
app.use('/api/users', require('./routes/userRoute')); // Ensure path is correct
app.use('/api/problems', require('./controllers/ProblemController'));
app.use('/api', problemRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is running on port ' + port));
