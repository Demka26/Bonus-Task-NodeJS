// Create the model for each object:
const mongoose = require('mongoose');

// Schema - collection
let ShoeSchema = new mongoose.Schema(
    {
        id: Number,
        brand:String,
        model: String,
        year: Number,
        size :Number,
        amount: Number
    },
    {
        strict:false
    }
)

//Use model to export the Schema:
const ShoeModel = mongoose.model("ShoeSchema",ShoeSchema);

// Export the model outside the file:
module.exports = ShoeModel;