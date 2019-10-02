const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
        vacancy: {
            type: Schema.Types.ObjectId,
            ref: 'Vacancy'
        },
        question: String,
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Question', questionSchema);