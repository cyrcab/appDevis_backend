/*
  Warnings:

  - You are about to drop the column `offer_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `offer_id` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `offer_response_id` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `offer_user_id` on the `Estimate` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `fk_Answer_Offer` ON `Answer`;

-- DropIndex
DROP INDEX `fk_Estimate_Offer_idx` ON `Estimate`;

-- AlterTable
ALTER TABLE `Answer` DROP COLUMN `offer_id`;

-- AlterTable
ALTER TABLE `Estimate` DROP COLUMN `offer_id`,
    DROP COLUMN `offer_response_id`,
    DROP COLUMN `offer_user_id`;
