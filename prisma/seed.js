// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  // Create sample destinations
  const villaDelMar = await prisma.destination.create({
    data: {
      name: 'Villa del Mar',
      picture: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/b0/18/73/villa-del-mar-hotel.jpg?w=700&h=-1&s=1',
      review: "It was a great place I loved being with my family at the beach people were really welcoming, but I did not like how expensive it was",
    },
  });

  // Create sample users
  const user = await prisma.user.create({
    data: {
      username: 'sampleuser',
      password: 'password', // Consider hashing this in a real scenario
    },
  });

  // Create sample reviews
  await prisma.review.create({
    data: {
      destinationId: villaDelMar.id,
      review: 'Amazing place!',
      picture: 'https://someurl.com/review.jpg',
      userId: user.id,
    },
  });

  console.log('Seeding completed!');
};

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });







