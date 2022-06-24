/*
  Warnings:

  - You are about to drop the `Estimate_has_Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Estimate_has_Question` DROP FOREIGN KEY `fk_Estimate_has_Question_Estimate`;

-- DropForeignKey
ALTER TABLE `Estimate_has_Question` DROP FOREIGN KEY `fk_Estimate_has_Question_Question`;

-- AlterTable
ALTER TABLE `Answer` MODIFY `question_id` INTEGER UNSIGNED NULL;

-- DropTable
DROP TABLE `Estimate_has_Question`;

-- CreateTable
CREATE TABLE `Estimate_has_Answer` (
    `estimate_id` INTEGER UNSIGNED NOT NULL,
    `answer_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_Estimate_has_Answer_Estimate_idx`(`estimate_id`),
    INDEX `fk_Estimate_has_Answer_Answer_idx`(`answer_id`),
    PRIMARY KEY (`estimate_id`, `answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estimate_has_Answer` ADD CONSTRAINT `fk_Estimate_has_Answer_Answer` FOREIGN KEY (`answer_id`) REFERENCES `Answer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Estimate_has_Answer` ADD CONSTRAINT `fk_Estimate_has_Answer_Estimate` FOREIGN KEY (`estimate_id`) REFERENCES `Estimate`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
