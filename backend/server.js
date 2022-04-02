const express = require('express');
const colors = require('colors');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { errHandler, errorHandler } = require('./middleware/error-middleware');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goal-routes'));
app.use(errorHandler);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`App serving on the port ${PORT}`)
})