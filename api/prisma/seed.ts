import { PrismaClient } from '../generated/prisma'
const db = new PrismaClient()

async function main() {
    console.log("Seed paused flag as 'false'.")

    const payload = {
        name: 'paused',
        value: false
    }

    await db.flags.upsert({
        where: { name: 'paused' },
        create: payload,
        update: payload
    })
}

await main();