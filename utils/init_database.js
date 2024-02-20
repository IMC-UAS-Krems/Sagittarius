const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function seedData() {
    try {
        // use `prisma` in your application to read and write data in your DB
        await prisma.municipality.createMany({
            data: [
                {
                    name: 'Tulln',
                },
                {
                    name: 'Wiener Neustadt'
                },
                {
                    name: 'Krems'
                }
            ]
        });
        await prisma.user.create({
            data: {
                name: "default",
                email: "email@example6.com",
                username: "email@example6.com",
                password: "password123",
                municipality:
                {
                    connect: {
                        name: "Krems",
                    },
                },
                organisation
                    : undefined,
                project
                    : undefined,
            },
        });

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Call the function to execute the code
seedData();
