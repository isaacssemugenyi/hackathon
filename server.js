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
    useUnifiedTopology: true,
    useFindAndModify: false, 
    
},
() => console.log('connected')
)
})()


const PORT = process.env.PORT || 3000;

require('./src/index')(app)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;