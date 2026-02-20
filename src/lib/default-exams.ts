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
  {
    subject: 'Physics',
    questions: [
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
        text: 'Which of these is a form of energy?',
        options: ['Velocity', 'Temperature', 'Kinetic energy', 'Pressure'],
        correctOption: 2,
      },
      {
        text: 'If voltage increases while resistance stays constant, current:',
        options: ['Decreases', 'Increases', 'Stays the same', 'Becomes zero'],
        correctOption: 1,
      },
      {
        text: 'A device that measures electric current is called:',
        options: ['Voltmeter', 'Ammeter', 'Thermometer', 'Barometer'],
        correctOption: 1,
      },
    ],
  },
  {
    subject: 'Chemistry',
    questions: [
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
        text: 'Which is a noble gas?',
        options: ['Oxygen', 'Nitrogen', 'Helium', 'Hydrogen'],
        correctOption: 2,
      },
      {
        text: 'Rusting is an example of:',
        options: ['Neutralization', 'Oxidation', 'Distillation', 'Evaporation'],
        correctOption: 1,
      },
      {
        text: 'The chemical symbol for Sodium is:',
        options: ['So', 'Sd', 'Na', 'N'],
        correctOption: 2,
      },
    ],
  },
  {
    subject: 'Biology',
    questions: [
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
        text: 'Humans have how many chambers in the heart?',
        options: ['2', '3', '4', '5'],
        correctOption: 2,
      },
      {
        text: 'Which blood cells help to fight infection?',
        options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'],
        correctOption: 1,
      },
      {
        text: 'The process by which plants lose water vapor is called:',
        options: ['Transpiration', 'Respiration', 'Germination', 'Excretion'],
        correctOption: 0,
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
