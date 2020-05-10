const express = require('express');
require('express-async-errors');
require('./db');
const cors = require('cors');
const { errorHandler, requireAuth } = require('./middlewares');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

/* Controllers */
const authController = require('./controllers/auth');
const signUpController = require('./controllers/signup');
const usersController = require('./controllers/users');
const postsController = require('./controllers/posts');
const commentsController = require('./controllers/comments');


const app = express();
app.use(bodyParser.json());
app.use(errorHandler);
app.use(express.static(`${__dirname}/../build`));
app.use(cors());

app.use('/auth', authController);
app.use('/signup', signUpController);

const api = express.Router();
api.use('/users', usersController);
api.use('/posts', postsController);
api.use('/comments', commentsController);

app.use('/api', requireAuth, api);

app.use((req, res, next) => {
    res.status(404).send({ message: 'Not Found' })
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ message: err.message })
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running on ${PORT} port`)
});
