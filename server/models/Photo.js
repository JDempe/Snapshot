const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  sizes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Size',
    },
  ],
});

// When the photo is made, find the user that created it and add it to their savedPhotos array
photoSchema.post('save', async function (doc, next) {
  const User = require('./User');
  await User.findOneAndUpdate(
    { _id: doc.createdBy },
    { $addToSet: { savedPhotos: doc._id } }
  );
  next();
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
