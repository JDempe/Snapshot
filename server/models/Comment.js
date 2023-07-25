const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Photo',
    required: true,
  },
});

// find the photo and add this comment id to the photo's comments array field
commentSchema.post('save', async function () {
  const Comment = this.constructor;
  const comment = await Comment.findById(this._id).populate('photo');
  comment.photo.comments.push(this._id);
  await comment.photo.save();
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
