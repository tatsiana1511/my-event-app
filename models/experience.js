const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    serviceName: {type: String, required: true},
    serviceType: {type: String, required: true},
    description: {type: String, required: true},
    pricePerHour: {type: Number, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Experience', experienceSchema);