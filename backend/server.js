const path = require('path');
const express = require('express');
const colors = require('colors');
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { errorHandler } = require('./middleware/error-middleware');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goal-routes'));
app.use('/api/users', require('./routes/user-routes'));
app.use(errorHandler);

// Server frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')),
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App serving on the port ${PORT}`);
});
