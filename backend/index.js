const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const normalUserRoutes = require('./routes/normalUserRoutes');
const storeOwnerRoutes = require('./routes/storeOwnerRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    req.db = db;
    next();
});


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/normal-user', normalUserRoutes);
app.use('/api/store-owner', storeOwnerRoutes);


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + db.threadId);
});

app.get('/', (req, res) => {
    res.send('Store Ratings API is running!');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
