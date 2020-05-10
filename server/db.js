// docker run --name social-network-mongo -d -p 27017:27017  mongo
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const DB_URL = process.env.MONGO_DB_CONNECTION_URL || 'mongodb://localhost:27017/social-network';
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
