const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const main = async () => {
  try {
    // Update existing destinations or create new ones
    const destinationsData = [
      {
        id: 1,
        name: 'Ibiza, Spain',
        review: 'Ibiza Town is the capital of Ibiza, one of Spain\'s Balearic Islands in the Mediterranean Sea. It\'s known for its lively nightlife scene.',
        picture: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2e/a4/ibiza.jpg?w=1400&h=1400&s=1'
      },
      {
        id: 2,
        name: 'Antigua, Guatemala',
        review: 'Antigua Guatemala is a city in Guatemala that some say is beautiful, colorful, and peaceful.',
        picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Santa_Catalina_Arch_-_Antigua_Guatemala_Feb_2020.jpg/640px-Santa_Catalina_Arch_-_Antigua_Guatemala_Feb_2020.jpg'
      },
      {
        id: 4,
        name: 'Tokyo, Japan',
        review: 'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples.',
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_Ux1WF34znI7ysn8ZHlWiZTC0y-WvQCi-w&s'
      },
      {
        id: 5,
        name: 'Londres, England',
        review: 'Whilst a bit pricey, visiting London was the most amazing experience I have had to date! I recommend it to anyone from the US - we speak the same language, so its extremely easy to "get your feet wet" ,',
        picture: 'https://www.puravidaglobaltravel.com/wp-content/uploads/2024/06/raves-ten-days-in-london-england-pura-vida-global-travel-01.jpg'
      }
    ];

    for (const destination of destinationsData) {
      await prisma.destination.upsert({
        where: { id: destination.id },
        update: destination,
        create: destination,
      });
    }

    console.log('Destinations updated or created.');

    // Update existing user or create new
    const hashedPassword = await bcrypt.hash('plainPassword', 10);
    const user = await prisma.user.upsert({
      where: { username: 'sampleuser' },
      update: { password: hashedPassword },
      create: { username: 'sampleuser', password: hashedPassword },
    });
    console.log('User updated or created:', user);

    // Update existing comments or create new ones
    const commentsData = [
      {
        destinationId: 1,
        comment: "I love the nightlife in Ibiza! The beaches are fantastic too.",
        name: "Alice",
      },
      {
        destinationId: 2,
        comment: "Antigua is so beautiful and full of history. A must-visit!",
        name: "Bob",
      },
      {
        destinationId: 4,
        comment: "Tokyo is an incredible mix of modern and traditional. Highly recommend visiting.",
        name: "Charlie",
      }
    ];
    
    for (const comment of commentsData) {
      await prisma.comment.upsert({
        where: {
          destinationId_name: {
            destinationId: comment.destinationId,
            name: comment.name,
          },
        },
        update: {
          comment: comment.comment,
          name: comment.name,
        },
        create: {
          destinationId: comment.destinationId,
          comment: comment.comment,
          name: comment.name,
        },
      });
    }
    
    console.log('Comments updated or created.');

    console.log('Seeding completed!');
  } catch (e) {
    console.error('Error during seeding:', e);
  } finally {
    await prisma.$disconnect();
  }
};

main();






