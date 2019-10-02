const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema(
    {
        question: {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        },
        application: {
            type: Schema.Types.ObjectId,
            ref: 'Application'
        },
        response: String,
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Answer', answerSchema);