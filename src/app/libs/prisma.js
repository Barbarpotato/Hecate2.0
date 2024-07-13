import { PrismaClient } from "@prisma/client";

let prisma;

if (!global.prisma) {
    global.prisma = new PrismaClient();
}
prisma = global.prisma;

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

module.exports = prisma;
