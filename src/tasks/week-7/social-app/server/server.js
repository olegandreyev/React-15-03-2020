const express = require('express');
require('express-async-errors');
require('./db');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');
const cors = require('cors');
const { errorHandler, requireAuth } = require('./middlewares');
const bodyParser = require('body-parser');
const PORT = 5000;

const app = express();
app.use(bodyParser.json());
app.use(errorHandler);
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.post('/signup', async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
    } catch (err) {
        if (err.code === 11000) {
            res.sendHTTPError(400, 'User already exists!');
        }
        throw err;
    }
    res.send(newUser);
});

app.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    const authToken = await user.signIn(password);
    res.send({ authToken, user })
});

app.get('/api/users', requireAuth, async (req, res) => {
    const result = await User.find({});
    res.send(result);
});

app.get('/api/me', requireAuth, async (req, res) => {
    const user = await User.findById(req.userId);
    res.json(user)
});

app.post('/api/posts', requireAuth, async (req, res) => {
    const newPost = req.body;
    newPost.author = req.userId;
    const post = await new Post(newPost);
    res.send(post);
});

app.get('/api/posts', requireAuth, async (req, res) => {
    const user = await Post.find({}).populate('author');
    res.json(user)
});

app.post('/api/posts/:id/comments', requireAuth, async (req, res) => {
    const comment = new Comment({
        body: req.body.text,
        author: req.userId,
        entityId: req.params.id,
        entityModel: 'Post'
    });
    await comment.save();
    res.send(comment);
});

app.get('/api/posts/:id/comments', requireAuth, async (req, res) => {
    const comments = await Comment.find({ entityId: req.params.id }).populate('author');
    res.send(comments);
});

app.use((req, res, next) => {
    res.status(404).send({ message: 'Not Found' })
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running on ${PORT} port`)
});
