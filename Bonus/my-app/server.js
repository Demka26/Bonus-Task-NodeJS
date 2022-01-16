const express = require('express');

// mongoose
const mongoose= require('mongoose');

// import the router:
const shoes = require('./routes/ShoesRoute');

const app = express();
const PORT = 3000;

app.use(express.static("public"));

// middleware - תווכה
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// use the router for shoes:
app.use('/shoes',shoes);

// Connect to MongoDB using mongoose - to Stock database.
mongoose.connect('mongodb://localhost:27017/Stock',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});



app.listen(PORT, () => console.log(`Listening in port ${PORT}`));