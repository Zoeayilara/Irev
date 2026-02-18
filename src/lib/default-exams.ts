import prisma from '@/lib/prisma'

const STAGE_1_DURATION_SECONDS = 1800

const stage1Subjects = [
  {
    subject: 'Mathematics',
    questions: [
      {
        text: 'What is 12 ÷ 3?',
        options: ['2', '3', '4', '6'],
        correctOption: 2,
      },
      {
        text: 'What is 15% of 200?',
        options: ['15', '20', '25', '30'],
        correctOption: 3,
      },
      {
        text: 'Solve: 7 × 8',
        options: ['54', '56', '58', '64'],
        correctOption: 1,
      },
      {
        text: 'Simplify: 3/9',
        options: ['1/2', '1/3', '2/3', '3/9'],
        correctOption: 1,
      },
      {
        text: 'What is the next number in the sequence: 2, 4, 8, 16, ?',
        options: ['18', '24', '30', '32'],
        correctOption: 3,
      },
    ],
  },
  {
    subject: 'English',
    questions: [
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
      {
        text: 'Which is a noun?',
        options: ['Run', 'Beautiful', 'Happiness', 'Quickly'],
        correctOption: 2,
      },
      {
        text: 'Pick the correct punctuation:',
        options: ['Let\'s eat grandma.', 'Let\'s eat, grandma.', 'Lets eat grandma.', 'Lets eat, grandma.'],
        correctOption: 1,
      },
    ],
  },
] as const

export async function ensureDefaultStage1Exams() {
  await prisma.$transaction(async (tx) => {
    for (const subjectBlock of stage1Subjects) {
      const exists = await tx.exam.findFirst({
        where: { stage: 1, subject: subjectBlock.subject },
        select: { id: true },
      })

      if (exists) continue

      await tx.exam.create({
        data: {
          stage: 1,
          subject: subjectBlock.subject,
          duration: STAGE_1_DURATION_SECONDS,
          questions: {
            create: subjectBlock.questions.map((q) => ({
              text: q.text,
              options: q.options,
              correctOption: q.correctOption,
            })),
          },
        },
      })
    }
  })
}
