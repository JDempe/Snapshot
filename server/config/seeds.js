const db = require('./connection');
const { User, Order, Photo, Comment, Size} = require('../models');

db.once('open', async () => {
  await Size.deleteMany();
  await Comment.deleteMany();
  await Photo.deleteMany();
  await Order.deleteMany();
  await User.deleteMany();

  // Sizes creation
  const sizes = await Size.create([
    {
      size: '4x6',
      currentPrice: 5.0,
    },
    {
      size: '5x7',
      currentPrice: 10.0,
    },
    {
      size: '8x10',
      currentPrice: 15.0,
    },
    {
      size: '11x14',
      currentPrice: 20.0,
    },
    {
      size: '16x20',
      currentPrice: 25.0,
    },
    {
      size: '20x24',
      currentPrice: 30.0,
    },
    {
      size: '24x36',
      currentPrice: 35.0,
    },
  ]);

  console.log('Sizes seeded');

  // Users creation
  const users = await User.create([
    {
      username: 'JacobWilliams',
      firstName: 'Jacob',
      lastName: 'Williams',
      email: 'jacob.williams@test.com',
      password: 'securePassword1',
    },
    {
      username: 'SaraSmith',
      firstName: 'Sara',
      lastName: 'Smith',
      email: 'sara.smith@test.com',
      password: 'securePassword2',
    },
    {
      username: 'JohnDoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      password: 'securePassword3',
    },
    {
      username: 'JaneDoe',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jadoe@test.com',
      password: 'securePassword4',
    },
    {
      username: 'BobSmith',
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bobby@test.com',
      password: 'securePassword5',
    },
  ]);

  console.log('Users seeded');

  // Photos creation
  const photos = await Photo.create([
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689699075/your_folder_name/s9zaio0qr6pamkbm3pyk.jpg',
      title: 'Mae the Dog',
      description: 'It is a dog with a cute outfit.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
      sizes: [sizes[0]._id, sizes[1]._id]

    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689922435/istockphoto-1138389252-612x612_ivufb8.jpg',
      title: 'City in Night',
      description: 'Night view of a bustling city from the top.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
      sizes: [sizes[1]._id, sizes[1]._id]

    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655785/cld-sample-4.jpg',
      title: 'Food',
      description: 'A plate of delicious food.',
      // randomly select a user
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
      sizes: [sizes[2]._id, sizes[1]._id]
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655784/cld-sample-2.jpg',
      title: 'Mountains',
      description: 'A beautiful view of the mountains.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
      sizes: [sizes[3]._id, sizes[1]._id]

    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655782/samples/balloons.jpg',
      title: 'Balloons',
      description: 'A bunch of balloons in the sky.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
      sizes: [sizes[4]._id, sizes[1]._id]

    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655767/samples/food/spices.jpg',
      title: 'Spices',
      description: 'A bunch of spices.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
      sizes: [sizes[5]._id, sizes[1]._id] 
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655764/samples/landscapes/beach-boat.jpg',
      title: 'Beach',
      description: 'A beautiful beach.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
      sizes: [sizes[6]._id, sizes[1]._id]
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655762/samples/animals/three-dogs.jpg',
      title: 'Dogs',
      description: 'Three cute dogs.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
      sizes: [sizes[0]._id, sizes[1]._id]
    },
  ]);

  console.log('Photos seeded');

  // Orders creation
  const orders = await Order.create([
    {
      purchaseDate: new Date(),
      products: [
        {
          photo: photos[0]._id,
          size: '5x7',
          price: 10.0,
          quantity: 1,
        },
        {
          photo: photos[1]._id,
          size: '8x10',
          price: 15.0,
          quantity: 3,
        },
      ],
      total: 0,
    },
  ]);

  console.log('Orders seeded');

  // Comments creation
  await Comment.create([
    {
      text: 'The night sky in this photo looks mesmerizing.',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[0]._id,
    },
    {
      text: 'The mountains in this photo look so majestic.',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[1]._id,
    },
    {
      text: 'Nice click!',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[1]._id,
    },
  ]);

  console.log('Comments seeded');

  process.exit();
});
