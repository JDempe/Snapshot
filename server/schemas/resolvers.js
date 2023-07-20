const { AuthenticationError } = require('apollo-server-express');
const { User, Photo, Comment, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const cloudinary = require('cloudinary');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
<<<<<<< HEAD
    user: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
=======
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });
>>>>>>> c3df5f0cde678386c5efb26e1722b0be6bb6999e

      throw new AuthenticationError('Not logged in');
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
<<<<<<< HEAD
        return await Order.findOne({ '_id': _id, 'user._id': context.user._id });
=======
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });

        return user.orders.id(_id);
>>>>>>> c3df5f0cde678386c5efb26e1722b0be6bb6999e
      }

      throw new AuthenticationError('Not logged in');
    },
    comments: async () => {
      return Comment.find();
    },
    comment: async (parent, { _id }) => {
      return Comment.findById(_id);
    },
    checkout: async (parent, { products }, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: products });
      const line_items = [];

      const { products: populatedProducts } = await order.populate('products');

      for (let i = 0; i < populatedProducts.length; i++) {
        const product = await stripe.products.create({
<<<<<<< HEAD
          name: populatedProducts[i].name,
          description: populatedProducts[i].description,
          images: [`${url}/images/${populatedProducts[i].image}`]
=======
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
>>>>>>> c3df5f0cde678386c5efb26e1722b0be6bb6999e
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: populatedProducts[i].price * 100,
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

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
<<<<<<< HEAD
=======
    addOrder: async (parent, { products }, context) => {
      console.log(context);
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
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
>>>>>>> c3df5f0cde678386c5efb26e1722b0be6bb6999e
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
<<<<<<< HEAD
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const totalCost = products.reduce((acc, product) => acc + (product.quantity * product.price), 0);

        const order = new Order({ products, totalCost });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    addPhoto: async (parent, args, context) => {
      if (context.user) {
        return await Photo.create({ ...args, createdBy: context.user._id });
      }

      throw new AuthenticationError('Not logged in');
    },
    addComment: async (parent, { photoId, content }, context) => {
      if (context.user) {
        return await Comment.create({ photoId, content, createdBy: context.user._id });
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
=======
    uploadPhoto: async (_, { uploadURL, description, photoName }) => {
      //initialize cloudinary
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      /*
      try-catch block for handling actual image upload
      */
      try {
        // do a fetch POST to the cloudinary upload URL
        const response = await fetch(uploadURL, {
          method: 'POST',
          body: data,
        });

        return `Successful-Photo URL: ${response.url}`;
      } catch (e) {
        //returns an error message on image upload failure.
        return `Image could not be uploaded:${e.message}`;
      }
    },
  },
>>>>>>> c3df5f0cde678386c5efb26e1722b0be6bb6999e
};


module.exports = resolvers;