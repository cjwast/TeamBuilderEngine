const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vacancySchema = new Schema(
    {
        name: String,
        PublishDate: Datetime,
        ClosingDate: Datetime,
        MainResponsabilities: String,
        Requirements: String
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Vacancy', vacancySchema);