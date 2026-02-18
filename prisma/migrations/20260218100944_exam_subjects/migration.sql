/*
  Warnings:

  - A unique constraint covering the columns `[stage,subject]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Exam_stage_key` ON `exam`;

-- AlterTable
ALTER TABLE `exam` ADD COLUMN `subject` VARCHAR(191) NOT NULL DEFAULT 'General';

-- CreateIndex
CREATE UNIQUE INDEX `Exam_stage_subject_key` ON `Exam`(`stage`, `subject`);
