const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

const main = async () => {
  // Seed Users
  console.log("Creating users...");
  const [user1, user2, user3] = await Promise.all(
    [...Array(3)].map(() => 
      prisma.user.create({
        data: {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
        },
      })
    )
  );
  
  console.log("Users created:", [user1, user2, user3]);

  // Seed Items
  console.log("Creating items...");
  const items = await Promise.all(
    [...Array(5)].map(() => 
      prisma.item.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
        },
      })
    )
  );
  
  console.log("Items created:", items.length);

  // Seed Reviews
  console.log("Creating reviews...");
  const reviews = [];
  const usedCombinations = new Set();

  for (let i = 0; i < 20; i++) {
    let userId, itemId;
    do {
      userId = [user1, user2, user3][Math.floor(Math.random() * 3)].id;
      itemId = items[Math.floor(Math.random() * items.length)].id;
    } while (usedCombinations.has(`${userId}-${itemId}`));

    usedCombinations.add(`${userId}-${itemId}`);
    
    const review = await prisma.review.create({
      data: {
        userId,
        itemId,
        textReview: faker.lorem.sentences(2),
        rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      },
    });
    reviews.push(review);
  }
  
  console.log("Reviews created:", reviews.length);

  // Seed Comments
  console.log("Creating comments...");
  await Promise.all(
    [...Array(30)].map(() => 
      prisma.comment.create({
        data: {
          userId: [user1, user2, user3][Math.floor(Math.random() * 3)].id,
          reviewId: reviews[Math.floor(Math.random() * reviews.length)].id,
          textComment: faker.lorem.sentence(),
        },
      })
    )
  );
  
  console.log("Comments created: 30");

  console.log('Seeding completed successfully!');
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

