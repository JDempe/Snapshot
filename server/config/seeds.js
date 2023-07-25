const db = require('./connection');
const { User, Order, Photo, Comment, Size } = require('../models');

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
      username: 'JDempe93',
      firstName: 'Joshua',
      lastName: 'Dempe',
      email: 'handsome@youngman.com',
      password: 'testtest',
    },
    {
      username: 'JacobWilliams',
      firstName: 'Jacob',
      lastName: 'Williams',
      email: 'jacob.williams@test.com',
      password: 'securePassword1',
    },
    {
      username: 'SurelyYouCantBeSerious',
      firstName: 'Sara',
      lastName: 'Smith',
      email: 'sara.smith@test.com',
      password: 'securePassword2',
    },
    {
      username: 'JuliusCaesar',
      firstName: 'Jules',
      lastName: 'Spencer',
      email: 'john.doe@test.com',
      password: 'securePassword3',
    },
    {
      username: 'ItsATrap',
      firstName: 'Jane',
      lastName: 'Skellington',
      email: 'jadoe@test.com',
      password: 'securePassword4',
    },
    {
      username: 'BobTheDeconstructor',
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
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689657760/your_folder_name/igbbihstllvestbstame.jpg',
      title: 'Mae the Dog',
      description: 'It is a dog that is booping the snoot.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689922435/istockphoto-1138389252-612x612_ivufb8.jpg',
      title: 'City in Night',
      description: 'Night view of a bustling city from the top.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655785/cld-sample-4.jpg',
      title: 'Food',
      description: 'A plate of delicious food.',
      // randomly select a user
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655784/cld-sample-2.jpg',
      title: 'Mountains',
      description: 'A beautiful view of the mountains.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655782/samples/balloons.jpg',
      title: 'Balloons',
      description: 'A bunch of balloons in the sky.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655767/samples/food/spices.jpg',
      title: 'Spices',
      description: 'A bunch of spices.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655764/samples/landscapes/beach-boat.jpg',
      title: 'Beach',
      description: 'A beautiful beach.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655762/samples/animals/three-dogs.jpg',
      title: 'Just Three Dogs',
      description: 'Three cute dogs.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1690316970/IMG_6610_kmic30.jpg',
      title: 'PSSPSSPSSPSS',
      description: 'A glorious and majestic kitty cat.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1690316968/DSC_2131_ypx3ds.jpg',
      title: 'Stick out of Water',
      description: 'There is no joke here.  It is a stick, in water.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1690316969/DSC_1035_os5z0s.jpg',
      title: "Where I'd Rather Be",
      description: 'Let me out! Im trapped in this computer!',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689977715/kaahsdvaqpyf3nrmlv14.jpg',
      title: 'Rope, I Think?',
      description:
        'A deep look at what we are truly made of, brought to you by yarn.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1689655759/samples/sheep.jpg',
      title: 'BAAAAAAAAAAAAAAAAAH',
      description:
        'A picture of the 1980 protest of the inhumane conditions of wool farming, where roads were blocked for hours.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
    {
      url: 'https://res.cloudinary.com/dvifr0ga6/image/upload/v1690317517/Miso-Soup-8297-I_tynw6g.jpg',
      title: 'Miso Hungry',
      description: 'A bowl of miso soup, with a side of chopsticks.',
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      likes: 0,
    },
  ]);

  console.log('Photos seeded');

  // // Orders creation
  // const orders = await Order.create([
  //   {
  //     orderNumber: Math.floor(100000 + Math.random() * 900000),
  //     purchaseDate: new Date(),
  //     products: [
  //       {
  //         photo: photos[0]._id,
  //         size: '5x7',
  //         price: 10.0,
  //         quantity: 1,
  //       },
  //       {
  //         photo: photos[1]._id,
  //         size: '8x10',
  //         price: 15.0,
  //         quantity: 3,
  //       },
  //     ],
  //     total: 0,
  //   },
  // ]);

  // console.log('Orders seeded');

  // Comments creation
  await Comment.create([
    {
      text: 'The night sky in this photo looks mesmerizing.',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[Math.floor(Math.random() * photos.length)]._id,
    },
    {
      text: 'The mountains in this photo look so majestic.',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[Math.floor(Math.random() * photos.length)]._id,
    },
    {
      text: 'Look at this photograph!  Every time I do it makes me laugh!',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[Math.floor(Math.random() * photos.length)]._id,
    },
    {
      text: 'I love the colors in this photo.',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[Math.floor(Math.random() * photos.length)]._id,
    },
    {
      text: 'This photo is so cute!',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[Math.floor(Math.random() * photos.length)]._id,
    },
    {
      text: 'This photo is so cool!',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[Math.floor(Math.random() * photos.length)]._id,
    },
    {
      text: 'This photo is so beautiful!',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[Math.floor(Math.random() * photos.length)]._id,
    },
    {
      text: 'This photo is so funny!',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[Math.floor(Math.random() * photos.length)]._id,
    },
    {
      text: 'This photo is so majestic!',
      createdAt: new Date(),
      createdBy: users[Math.floor(Math.random() * users.length)]._id,
      photo: photos[Math.floor(Math.random() * photos.length)]._id,
    },
  ]);

  console.log('Comments seeded');

  // Add photos to users' likedPhotos and savedPhotos if they created it
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];

    // Add photo to user's savedPhotos if they created it
    await User.findOneAndUpdate(
      { _id: photo.createdBy },
      { $addToSet: { savedPhotos: photo._id } }
    );

    // add random photos from the photos to each users likedPhotos array
    // for each user
    // add random photo to user's likedPhotos if they didn't create it

    for (let j = 0; j < users.length; j++) {
      const user = users[j];

      // if the user created the photo, skip
      if (user._id.toString() === photo.createdBy.toString()) {
        continue;
      }

      // 50% chance of adding photo to likedPhotos
      if (Math.random() > 0.5) {
        await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { likedPhotos: photo._id } }
        );
      }
    }
  }

  // go through each user and find the liked photos, then go to those photos and increment their likes by 1
  for (let i = 0; i < users.length; i++) {
    const userData = users[i];

    // look up the user to get the likedPhotos array
    const user = await User.findOne({ _id: userData._id });

    // find the photos that the user liked
    const likedPhotos = await Photo.find({ _id: { $in: user.likedPhotos } });

    // go through each photo and increment the likes by 1
    for (let j = 0; j < likedPhotos.length; j++) {
      const photo = likedPhotos[j];

      // increment the likes by 1
      await Photo.findOneAndUpdate({ _id: photo._id }, { $inc: { likes: 1 } });
    }
  }

  // for each photo, choose 3 random sizes and add them to the photo
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];

    // get 3 random sizes
    const randomSizes = sizes.sort(() => 0.5 - Math.random()).slice(0, 3);

    // add the sizes to the photo
    await Photo.findOneAndUpdate(
      { _id: photo._id },
      { $addToSet: { sizes: randomSizes } }
    );
  }

  console.log('Likes seeded');

  // Create Orders by randomly selecting a photo, size, and quantity and adding it to the order
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    // create a random number of orders for each user
    const numberOfOrders = Math.floor(Math.random() * 5) + 1;

    for (let j = 0; j < numberOfOrders; j++) {
      // create a random number of products for each order
      const numberOfProducts = Math.floor(Math.random() * 5) + 1;

      // create an array to hold the products
      const products = [];

      // create the products
      for (let k = 0; k < numberOfProducts; k++) {
        // get a random photo
        const photo = photos[Math.floor(Math.random() * photos.length)];

        // get a random size
        const size = sizes[Math.floor(Math.random() * sizes.length)];

        // get a random quantity
        // get a random number between 1 and 5
        const quantity = Math.floor(Math.random() * 5) + 1;

        // create the product object
        const product = {
          photo: photo._id,
          size: size.size,
          price: size.currentPrice,
          quantity,
        };

        // add the product to the products array
        products.push(product);
      }

      // create the order
      let order = await Order.create({
        orderNumber: Math.floor(100000 + Math.random() * 900000),
        purchaseDate: new Date(),
        products,
        total: 0,
        createdBy: user._id,
      });

      // assign the order to the user that created it in the orders array
      await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { orders: order._id } }
      );
    }
  }

  console.log('Orders seeded');

  process.exit();
});
