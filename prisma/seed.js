const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const seed = async () => {
  try {
    // Create destinations
    const destination1 = await prisma.destination.create({
      data: {
        name: 'Antigua, Guatemala', // Updated field name
        picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Santa_Catalina_Arch_-_Antigua_Guatemala_Feb_2020.jpg/640px-Santa_Catalina_Arch_-_Antigua_Guatemala_Feb_2020.jpg',
        review: 'Antigua Guatemala is known as the best-preserved Spanish colonial city in Central America. Stroll the cobblestone streets, lounge with the locals in Central Park on sunny afternoons or hike up one of the volcanoes overlooking the city for amazing views.',
      },
    });

    const destination2 = await prisma.destination.create({
      data: {
        name: 'Bogota, Colombia', // Updated field name
        picture: 'https://imageio.forbes.com/specials-images/imageserve/1182337590/Bogota-Colombia-skyline/960x0.jpg?format=jpg&width=960',
        review: 'Ten million people call vibrant, passionate, sprawling Bogota home. The energy of this metropolitan heart of Colombia is in part fueled by its hundreds of eclectic and authentic dining hot spots, fantastic wines, and frequent foodie festivals.',
      },
    });

    const destination3 = await prisma.destination.create({
      data: {
        name: 'Bacalar, Mexico', // Updated field name
        picture: 'https://img1.wsimg.com/isteam/ip/9b20b38a-b428-4bc2-ae85-6791e0107df8/223611D0-FFFE-487D-AFFB-2AAA39D2340A.JPG/:/cr=t:3.33%25,l:0%25,w:100%25,h:80.7%25',
        review: 'Located near the Mexico-Belize border, a true paradise awaits travelers in Bacalar. The town sits on the Lagoon of Seven Colors, a lake nicknamed for its beautifully colored water, which makes it the perfect place for stunning sunsets, fresh seafood, and cenote swimming.',
      },
    });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: 'john_doe' }
    });

    // Create user only if it doesn't exist
    const user1 = existingUser || await prisma.user.create({
      data: {
        username: 'john_doe',
        password: await bcrypt.hash('password123', 10),
      },
    });

    // Create reviews
    await prisma.review.create({
      data: {
        destinationId: destination1.id,
        review: "It was a great place I loved being with my family at the beach. People were really welcoming, but I did not like how expensive it was.",
        rating: 5,
        picture: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/b0/18/73/villa-del-mar-hotel.jpg?w=700&h=-1&s=1',
        userId: user1.id
      },
    });

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();






