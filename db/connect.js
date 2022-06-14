const mongoose = require('mongoose')





const connectDB = (url) => {
return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    UseFindAndModify: false,
    useUnifiedTopology: true, 
})
}

module.exports = connectDB


