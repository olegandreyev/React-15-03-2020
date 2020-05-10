// docker run --name social-network-mongo -d -p 27017:27017  mongo
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const DB_URL = 'mongodb+srv://dbUser:y69F5dPdmyFXDFwE@cluster0-4z1ho.mongodb.net/social-network';
// 'mongodb://localhost:27017/social-network';

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

// dbUser // user
// y69F5dPdmyFXDFwE // pass
