const mongoose = require('mongoose');

//This URL was taken by MongoDB Cluster.
const URI = "mongodb+srv://brunoborges:brnb@backenddorset.di6aq.mongodb.net/BackendDorset?retryWrites=true&w=majority"
const connectDB = async() => {
    try {
        await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Successful connection')
    } catch (err) {
        console.log('error', err)
    }
}

module.exports = connectDB;