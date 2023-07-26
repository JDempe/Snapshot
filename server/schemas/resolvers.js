const { AuthenticationError } = require('apollo-server-express');
const { User, Photo, Comment, Order, Size } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { _id }, context) => {
      return User.findOne({ _id: _id });
    },
    photos: async () => {
      return Photo.find().populate('createdBy');
    },
    photo: async (parent, { _id }) => {
      return Photo.findById(_id).populate('sizes');
    },

    orders: async (parent, args, context) => {
      if (context.user) {
        return await Order.find({ 'user._id': context.user._id });
      }
      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        return await Order.findOne({ _id: _id, 'user._id': context.user._id });
      }
      throw new AuthenticationError('Not logged in');
    },
    comments: async () => {
      return Comment.find();
    },
    comment: async (parent, { _id }) => {
      return Comment.findById(_id);
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      return { id: session.id, status: 'Created' }; // returning object with id and status
    },
  },
  User: {
    orders: async (parent) => {
      return Order.find({ _id: { $in: parent.orders } });
    },
    savedPhotos: async (parent) => {
      return Photo.find({ _id: { $in: parent.savedPhotos } });
    },
    likedPhotos: async (parent) => {
      return Photo.find({ _id: { $in: parent.likedPhotos } });
    },
  },
  Photo: {
    createdBy: async (parent) => {
      return User.findOne({ _id: parent.createdBy });
    },
    comments: async (parent) => {
      return Comment.find({ photo: parent._id });
    },
  },
  Order: {
    products: async (parent) => {
      return parent.products;
    },
  },

  Product: {
    photo: async (parent) => {
      return Photo.findOne({ _id: parent.photo });
    },
  },

  Comment: {
    createdBy: async (parent) => {
      return User.findOne({ _id: parent.createdBy });
    },
    photo: async (parent) => {
      return Photo.findOne({ _id: parent.photo });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const orderNumber = Math.floor(
          Math.random() * (10000000 - 100000) + 100000
        );
        const order = new Order({ products, orderNumber });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        return order;
      }
      throw new AuthenticationError('Not logged in');
    },

    addPhoto: async (parent, args, context) => {
      if (context.user) {
        const { url, title, description, sizes } = args;

        const photo = new Photo({
          url,
          title,
          description,
          createdBy: context.user._id,
        });

        if (sizes) {
          const sizeDocuments = sizes.map((size) => new Size(size));
          photo.sizes = sizeDocuments;
        }

        await photo.save();

        return photo;
      }
      throw new AuthenticationError('Not logged in');
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPhoto: async (parent, args, context) => {
      if (context.user) {
        return await Photo.create({ ...args, createdBy: context.user._id });
      }

      throw new AuthenticationError('Not logged in');
    },
    addComment: async (parent, { photoId, content }, context) => {
      if (context.user) {
        return await Comment.create({
          photo: photoId,
          text: content,
          createdBy: context.user._id,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
    updatePhoto: async (parent, { _id, sizes, ...args }, context) => {
      if (context.user) {
        // If sizes are provided, convert them to size documents
        if (sizes) {
          const sizeDocuments = sizes.map((size) => new Size(size));
          args.sizes = sizeDocuments;
        }

        const photo = await Photo.findByIdAndUpdate(
          _id,
          { ...args },
          { new: true }
        );
        return photo;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateComment: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        const comment = await Comment.findByIdAndUpdate(
          _id,
          { ...args },
          { new: true }
        );
        return comment;
      }

      throw new AuthenticationError('Not logged in');
    },
    deletePhoto: async (parent, { _id }, context) => {
      if (context.user) {
        const photo = await Photo.findByIdAndDelete(_id);
        return photo;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
