require('dotenv').config();
const express = require('express');
const multer = require('multer');
const studentRouter = require('./router/studentRouter');

const PORT = process.env.PORT;
const sequelize = require('./database/database');

const app = express();
app.use(express.json());
app.use(studentRouter);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError){
        return res.status(400).json({
            message: err.message
        });
    }
    next();
});

const DBConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Failed to connect to Database:', error.message)
    }
};

DBConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});