const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalitySchema = new Schema(
    {
        answer: {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        },
        personality: String,
        percentage: String,
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Personality', personalitySchema);