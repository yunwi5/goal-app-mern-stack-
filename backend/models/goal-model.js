const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // name of the User model which is 'User' in this case
    },
    text: {
        type: String,
        required: [true, 'Please add a text value'],
    },
});

module.exports = mongoose.model('Goal', goalSchema);