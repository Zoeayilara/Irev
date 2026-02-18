/*
  Warnings:

  - You are about to alter the column `score` on the `attempt` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - A unique constraint covering the columns `[attemptId,questionId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Attempt` ADD COLUMN `expiresAt` DATETIME(3) NULL,
    ADD COLUMN `resultReleaseAt` DATETIME(3) NULL,
    MODIFY `score` DOUBLE NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `fullName` VARCHAR(191) NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `tokenHash` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Session_tokenHash_key`(`tokenHash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Answer_attemptId_questionId_key` ON `Answer`(`attemptId`, `questionId`);

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
