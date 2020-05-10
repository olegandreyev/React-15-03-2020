const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';
const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        set: rawPassword => bcrypt.hashSync(rawPassword, SALT_WORK_FACTOR),
        select: false
    },
    verify_email_token: String,
    is_verified: {
        type: Boolean,
        default: false
    },
    first_name: String,
    last_name: String,
    age: Number
});


UserSchema.methods.signIn = function(password) {
    return bcrypt.compare(password, this.password)
        .then(result => result && jwt.sign({_id: this._id}, JWT_SECRET, {expiresIn: '24h'}))
};

UserSchema.pre('save', function() {
    this.verify_email_token = jwt.sign({ _id: this._id }, JWT_SECRET, { expiresIn: '6h' });
});

UserSchema.statics.verify = function(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(err)
            }
            resolve(decoded)
        })
    })
};

UserSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj.verify_email_token;
    return obj;
};

module.exports = mongoose.model('User', UserSchema);
