const {PrismaClient} = require('@prisma/client');
const {User,Book} = require('./data')
const prisma = new PrismaClient();

const load = async () => {
    try {
      await prisma.user.deleteMany();
      console.log('Deleted records in user table');
  
      await prisma.book.deleteMany();
      console.log('Deleted records in book table');
  
      await prisma.user.createMany({
        data: User,
      });
      console.log('Added user data');
  
      await prisma.book.createMany({
        data: Book,
      });
      console.log('Added book data');
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  };

load();