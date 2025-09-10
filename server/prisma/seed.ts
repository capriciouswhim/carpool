import { PrismaClient } from '../generated/prisma'
const db = new PrismaClient()

async function main() {
    console.log("Seed callImmediate flag as 'false'.")

    const payload = {
        name: 'callImmediate',
        value: false
    }

    await db.flag.upsert({
        where: { name: 'callImmediate' },
        create: payload,
        update: payload
    })
}

await main();