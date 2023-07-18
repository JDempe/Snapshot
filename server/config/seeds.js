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
      firstName: 'Jacob',
      lastName: 'Williams',
      email: 'jacob.williams@test.com',
      password: 'securePassword1'
    },
    {
      firstName: 'Olivia',
      lastName: 'Johnson',
      email: 'olivia.johnson@test.com',
      password: 'securePassword2'
    },
    {
      firstName: 'Gree',
      lastName: 'Rach',
      email: 'rachjohnson@test.com',
      password: 'securePassword3'
    },
    
    {
      firstName: 'Emma',
      lastName: 'Smith',
      email: 'emma.smith@example.com',
      password: 'securePassword4'
    },
    {
      firstName: 'Noah',
      lastName: 'Brown',
      email: 'noah.brown@example.com',
      password: 'securePassword5'
    },
    {
      firstName: 'Ava',
      lastName: 'Jones',
      email: 'ava.jones@example.com',
      password: 'securePassword6'
    },
    {
      firstName: 'Sophia',
      lastName: 'Davis',
      email: 'sophia.davis@example.com',
      password: 'securePassword7'
    },
  ]);

  console.log('Users seeded');

  // Photos creation
  const photos = await Photo.create([
    {
      url: '',
      title: 'Mountains Under Starry Sky',
      description: 'Beautiful mountain range under a starry sky.',
      size: 'Large',
      createdBy: users[0]._id
    },
    {
      url: '',
      title: 'City in Night',
      description: 'Night view of a bustling city from the top.',
      size: 'Medium',
      createdBy: users[1]._id
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
          quantity: 1,
        },
        {
          photo: photos[1]._id,
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
      text: 'The city lights in this photo are incredible!',
      createdAt: new Date(),
      createdBy: users[1]._id,
      photo: photos[1]._id,
    },
  ]);

  console.log('Comments seeded');

  process.exit();
});