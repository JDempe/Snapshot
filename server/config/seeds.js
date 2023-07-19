const db = require('./connection');
const { User, Order, Photo, Comment } = require('../models');

db.once('open', async () => {
  await Comment.deleteMany();
  await Photo.deleteMany();
  await Order.deleteMany();
  await User.deleteMany();

  // Users creation
  const users = await User.create([
    {
      username: 'JacobWilliams',
      firstName: 'Jacob',
      lastName: 'Williams',
      email: 'jacob.williams@test.com',
      password: 'securePassword1'
    },
    {

      username: 'SaraSmith',
      firstName: 'Sara',
      lastName: 'Smith',
      email: 'sara.smith@test.com',
      password: 'securePassword2'

    },
    {
      username: 'JohnDoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      password: 'securePassword3'
    },
    {
      username: 'JaneDoe',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jadoe@test.com',
      password: 'securePassword4'

    },
    {
      username: 'BobSmith',
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bobby@test.com',
      password: 'securePassword5'
    }

  ]);

  console.log('Users seeded');

  // Photos creation
  const photos = await Photo.create([
    {
      url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
      title: 'Mountains Under Starry Sky',
      description: 'Beautiful mountain range under a starry sky.',
      createdBy: users[0]._id,
      sizes: [
        {
          name: '5x7',
          price: 20
        },
        {
          name: '4x6',
          price: 35
        },
        {
          name: '16x20',
          price: 60
        },
        {
          name: '6x9',
          price: 40
        },
        {
          name: '9x12',
          price: 50
        }
      ],
      likes: 0
    },
    
  ]);

  console.log('Photos seeded');

  // Orders creation
  await Order.create([
    {
      purchaseDate: new Date(),
      products: [
        {
          photo: photos[0]._id,
          size: '5x7',
          quantity: 1,
        },
        {
          photo: photos[1]._id,
          size: '4x6',
          quantity: 3,
        },
      ],
      total: 200.00
    },
  ]);

  console.log('Orders seeded');

  // Comments creation
  await Comment.create([
    {
      text: 'The night sky in this photo looks mesmerizing.',
      createdAt: new Date(),
      createdBy: users[0]._id,
      photo: photos[0]._id,
    },
    {
      text: 'The mountains in this photo look so majestic.',
      createdAt: new Date(),
      createdBy: users[1]._id,
      photo: photos[1]._id,
    },
    {
      text: 'Nice click!',
      createdAt: new Date(),
      createdBy: users[2]._id,
      photo: photos[1]._id,
    },


  ]);

  console.log('Comments seeded');

  process.exit();
});