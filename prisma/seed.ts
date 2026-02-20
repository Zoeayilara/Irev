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

    const physicsExam = await prisma.exam.upsert({
        where: {
            stage_subject: {
                stage: 1,
                subject: 'Physics',
            },
        },
        update: {},
        create: {
            stage: 1,
            subject: 'Physics',
            duration: 1800,
            questions: {
                create: [
                    {
                        text: 'What is the SI unit of force?',
                        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
                        correctOption: 1,
                    },
                    {
                        text: 'Speed is defined as:',
                        options: ['Distance ÷ time', 'Time ÷ distance', 'Mass × acceleration', 'Force ÷ area'],
                        correctOption: 0,
                    },
                    {
                        text: 'A device that measures electric current is called:',
                        options: ['Voltmeter', 'Ammeter', 'Thermometer', 'Barometer'],
                        correctOption: 1,
                    },
                ],
            },
        },
    })

    const chemistryExam = await prisma.exam.upsert({
        where: {
            stage_subject: {
                stage: 1,
                subject: 'Chemistry',
            },
        },
        update: {},
        create: {
            stage: 1,
            subject: 'Chemistry',
            duration: 1800,
            questions: {
                create: [
                    {
                        text: 'Water is a compound made of:',
                        options: ['Hydrogen and Oxygen', 'Carbon and Oxygen', 'Sodium and Chlorine', 'Nitrogen and Hydrogen'],
                        correctOption: 0,
                    },
                    {
                        text: 'The pH of a neutral solution is:',
                        options: ['0', '7', '10', '14'],
                        correctOption: 1,
                    },
                    {
                        text: 'The chemical symbol for Sodium is:',
                        options: ['So', 'Sd', 'Na', 'N'],
                        correctOption: 2,
                    },
                ],
            },
        },
    })

    const biologyExam = await prisma.exam.upsert({
        where: {
            stage_subject: {
                stage: 1,
                subject: 'Biology',
            },
        },
        update: {},
        create: {
            stage: 1,
            subject: 'Biology',
            duration: 1800,
            questions: {
                create: [
                    {
                        text: 'The basic unit of life is the:',
                        options: ['Atom', 'Cell', 'Tissue', 'Organ'],
                        correctOption: 1,
                    },
                    {
                        text: 'Photosynthesis occurs in the:',
                        options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Ribosome'],
                        correctOption: 2,
                    },
                    {
                        text: 'Which blood cells help to fight infection?',
                        options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'],
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

    console.log({ mathExam, englishExam, physicsExam, chemistryExam, biologyExam, user })
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
