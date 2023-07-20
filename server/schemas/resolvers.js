const { AuthenticationError } = require('apollo-server-express');
const { User, Photo, Comment, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }, context) => {
      return User.findOne({ username });
    },
    photos: async () => {
      return Photo.find();
    },
    photo: async (parent, { _id }) => {
      return Photo.findById(_id);
    },
    orders: async (parent, args, context) => {
      if (context.user) {
        return await Order.find({ 'user._id': context.user._id });
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        return await Order.findOne({ '_id': _id, 'user._id': context.user._id });
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
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
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
        return await Comment.create({ photo: photoId, text: content, createdBy: context.user._id });
      }
    
      throw new AuthenticationError('Not logged in');
    },
    updatePhoto: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        const photo = await Photo.findByIdAndUpdate(_id, { ...args }, { new: true });
        return photo;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateComment: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        const comment = await Comment.findByIdAndUpdate(_id, { ...args }, { new: true });
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