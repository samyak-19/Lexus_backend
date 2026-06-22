const { PrismaClient } = require("@prisma/client");

console.log(PrismaClient);

const prisma = new PrismaClient();

module.exports = prisma;