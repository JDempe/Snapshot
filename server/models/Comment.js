const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Photo',
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;