/*
  Warnings:

  - You are about to drop the column `created_number` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `type` to the `Estimate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Answer` MODIFY `modified_by` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Category` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `modified_by` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `created_number`,
    MODIFY `lastname` VARCHAR(255) NOT NULL,
    MODIFY `firstname` VARCHAR(255) NOT NULL,
    MODIFY `company` VARCHAR(255) NOT NULL,
    MODIFY `phone` VARCHAR(255) NOT NULL,
    MODIFY `mail` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Estimate` ADD COLUMN `type` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Question` MODIFY `modified_by` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Role` MODIFY `Name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `firstName` VARCHAR(255) NOT NULL,
    MODIFY `lastName` VARCHAR(255) NOT NULL,
    MODIFY `mail` VARCHAR(255) NOT NULL,
    MODIFY `modified_by` VARCHAR(255) NULL;
