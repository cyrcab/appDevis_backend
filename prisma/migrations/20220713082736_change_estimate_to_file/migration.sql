/*
  Warnings:

  - You are about to drop the column `pack_id` on the `File` table. All the data in the column will be lost.
  - Added the required column `identification_number` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `fk_Estimate_Category`;

-- AlterTable
ALTER TABLE `File` DROP COLUMN `pack_id`,
    ADD COLUMN `identification_number` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Pack` ADD COLUMN `file_id` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `Pack` ADD CONSTRAINT `fk_Category_File1` FOREIGN KEY (`file_id`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
