const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const main = async () => {
  try {
    // Clear existing data
    await prisma.comment.deleteMany({});
    await prisma.destination.deleteMany({});
    await prisma.user.deleteMany({});

    // Create destinations
    const destinations = await prisma.destination.createMany({
      data: [
        {
          id: 1,
          name: 'Ibiza, Spain',
          review: 'Ibiza Town is the capital of Ibiza, one of Spain\'s Balearic Islands in the Mediterranean Sea. It\'s known for its lively nightlife scene, and many European nightclubs have summer outposts here. South of the center, Ses Figueretes and Platja d\'en Bossa are white-sand beaches. Above the harbor is the old quarter of Dalt Vila, with the Gothic-style Catedral de Santa María and views from Renaissance-era fortifications.',
          picture: '' // No picture URL provided
        },
        {
          id: 2,
          name: 'Antigua, Guatemala',
          review: 'Antigua Guatemala is a city in Guatemala that some say is beautiful, colorful, and peaceful. It\'s known for its rich history, religious festivals, and lively culture. Some say it\'s a great place to start when traveling to Guatemala. Here are some things to know about Antigua Guatemala.',
          picture: '' // No picture URL provided
        },
        {
          id: 4,
          name: 'Tokyo, Japan',
          review: 'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens. The city\'s many museums offer exhibits ranging from classical art (in the Tokyo National Museum) to a reconstructed kabuki theater (in the Edo-Tokyo Museum).',
          picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_Ux1WF34znI7ysn8ZHlWiZTC0y-WvQCi-w&s'
        }
      ]
    });
    console.log('Destinations created:', destinations);

    // Create example user
    const hashedPassword = await bcrypt.hash('plainPassword', 10);
    const user = await prisma.user.create({
      data: {
        username: 'sampleuser',
        password: hashedPassword,
      },
    });
    console.log('User created:', user);

    // Create sample comments
    const comments = await prisma.comment.createMany({
      data: [
        {
          destinationId: 1, // Ibiza, Spain
          comment: 'I love the nightlife in Ibiza! The beaches are fantastic too.',
          name: 'Alice',
        },
        {
          destinationId: 2, // Antigua, Guatemala
          comment: 'Antigua is so beautiful and full of history. A must-visit!',
          name: 'Bob',
        },
        {
          destinationId: 4, // Tokyo, Japan
          comment: 'Tokyo is an incredible mix of modern and traditional. Highly recommend visiting.',
          name: 'Charlie',
        }
      ]
    });
    console.log('Comments created:', comments);

    console.log('Seeding completed!');
  } catch (e) {
    console.error('Error during seeding:', e);
  } finally {
    await prisma.$disconnect();
  }
};

main();






