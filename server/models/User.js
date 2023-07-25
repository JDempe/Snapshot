const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  // profile picture should be the string /images/avatars/Avatar_#.png where # is a randomized number 1-20
  profilePicture: {
    type: String,
    default: '/images/avatars/Avatar_1.png',
  },

  likedPhotos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  savedPhotos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
  ownComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

// randomly generate a number between 1 and 20 to be used for the profile picture string
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    this.profilePicture = `/images/avatars/Avatar_${randomNum}.png`;
  }
});

// when something is added to the likedPhotos array, increment that photos Likes by 1, similarly, when something is removed from the likedPhotos array, decrement that photos Likes by 1
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('likedPhotos')) {
    const photo = await this.model('Photo').findOneAndUpdate(
      { _id: this.likedPhotos[this.likedPhotos.length - 1] },
      { $inc: { likes: 1 } }
    );
  } else if (this.isModified('likedPhotos')) {
    const photo = await this.model('Photo').findOneAndUpdate(
      { _id: this.likedPhotos[this.likedPhotos.length - 1] },
      { $inc: { likes: -1 } }
    );
  }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
