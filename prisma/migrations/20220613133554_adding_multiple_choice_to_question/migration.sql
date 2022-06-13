/*
  Warnings:

  - You are about to drop the column `has_multiple_choice` on the `Answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Answer` DROP COLUMN `has_multiple_choice`;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `has_multiple_choice` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` MODIFY `created_at` DATETIME(0) NULL;
