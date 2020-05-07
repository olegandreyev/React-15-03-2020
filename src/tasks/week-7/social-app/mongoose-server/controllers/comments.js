const Router = require('express').Router;
const Comment = require('../models/comment');
const router = Router();

router.delete('/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.sendHTTPError(404, 'Comment not found')
  }
  if (comment.author.toString() !== req.userId) {
    return res.sendHTTPError(403, 'You cannot delete other people\'s  comments')
  }
  await comment.remove();
  res.send({ deleted: true })
});

module.exports = router;
