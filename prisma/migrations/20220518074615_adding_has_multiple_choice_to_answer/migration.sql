/*
  Warnings:

  - You are about to drop the column `has_multiple_choice` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Answer` ADD COLUMN `has_multiple_choice` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `has_multiple_choice`;
