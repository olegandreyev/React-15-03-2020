const Router = require('express').Router;
const Post = require('../models/post');
const Comment = require('../models/comment');
const router = Router();

router.get('/', async (req, res) => {
  const posts = await Post.find({}).populate('author');
  res.send(posts);
});

router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  newPost.author = req.userId;
  await newPost.save();
  res.send(newPost);
});

router.get('/:id', async (req, res) => {
  const posts = await Post.findById(req.params.id).populate('author');
  res.send(posts);
});

router.put('/:id', async (req, res) => {
  const result = await Post.findByIdAndUpdate(req.params.id, req.body);
  res.send(result);
})

router.post('/:id/comments', async (req, res) => {
  const newComment = new Comment({
    ...req.body,
    author: req.userId,
    entityId: req.params.id,
    entityModel: 'Post'
  })
  await newComment.save()
  res.send(newComment);
})

router.get('/:id/comments', async (req, res) => {
  const comments = await Comment.find({ entityId: req.params.id }).populate('author')
  res.send(comments)
})



module.exports = router;
