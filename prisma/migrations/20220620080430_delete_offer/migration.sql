/*
  Warnings:

  - You are about to drop the `Offer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Answer` DROP FOREIGN KEY `fk_Answer_Offer`;

-- DropForeignKey
ALTER TABLE `Offer` DROP FOREIGN KEY `fk_Offer_User1`;

-- AlterTable
ALTER TABLE `Answer` MODIFY `price` INTEGER NULL;

-- DropTable
DROP TABLE `Offer`;

-- RenameIndex
ALTER TABLE `Answer` RENAME INDEX `fk_Response_User1_idx` TO `fk_Response_User_idx`;
