const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
(async()=>{
    await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
}).then(() => {
    console.log("Connected successfully")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
})()



const PORT = process.env.PORT || 3000;

require('./src/index')(app)

module.exports = app;