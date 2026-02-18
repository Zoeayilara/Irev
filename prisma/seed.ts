import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { promisify } from 'util'
const prisma = new PrismaClient()

const scrypt = promisify(crypto.scrypt)

async function hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString('hex')
    const derivedKey = (await scrypt(password, salt, 64)) as Buffer
    return `${salt}:${derivedKey.toString('hex')}`
}

async function main() {
    console.log('Seeding data...')

    const mathExam = await prisma.exam.upsert({
        where: {
            stage_subject: {
                stage: 1,
                subject: 'Mathematics',
            },
        },
        update: {},
        create: {
            stage: 1,
            subject: 'Mathematics',
            duration: 1800,
            questions: {
                create: [
                    {
                        text: 'What is 12 ÷ 3?',
                        options: ['2', '3', '4', '6'],
                        correctOption: 2,
                    },
                    {
                        text: 'Solve: 7 × 8',
                        options: ['54', '56', '58', '64'],
                        correctOption: 1,
                    },
                    {
                        text: 'What is the next number in the sequence: 2, 4, 8, 16, ?',
                        options: ['18', '24', '30', '32'],
                        correctOption: 3,
                    },
                ],
            },
        },
    })

    const englishExam = await prisma.exam.upsert({
        where: {
            stage_subject: {
                stage: 1,
                subject: 'English',
            },
        },
        update: {},
        create: {
            stage: 1,
            subject: 'English',
            duration: 1800,
            questions: {
                create: [
                    {
                        text: 'Choose the correct spelling:',
                        options: ['Recieve', 'Receive', 'Receeve', 'Receve'],
                        correctOption: 1,
                    },
                    {
                        text: 'Which word is a synonym of “quick”?',
                        options: ['Slow', 'Rapid', 'Lazy', 'Weak'],
                        correctOption: 1,
                    },
                    {
                        text: 'Choose the correct sentence:',
                        options: ['She don\'t like rice.', 'She doesn\'t like rice.', 'She not like rice.', 'She didn\'t likes rice.'],
                        correctOption: 1,
                    },
                ],
            },
        },
    })

    // Create a Demo User for testing
    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            email: 'test@example.com',
            passwordHash: await hashPassword('Password123!'),
            role: 'CANDIDATE',
            currentStage: 1 // Ready for exam
        }
    })

    console.log({ mathExam, englishExam, user })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
