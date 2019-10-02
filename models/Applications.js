const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        city: String,
        telephone: String,
        email: String,
        vacancy: {
            type: Schema.Types.ObjectId,
            ref: 'Vacancy'
        },
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Application', applicationSchema);