/*
  Warnings:

  - You are about to drop the `Options` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Options` DROP FOREIGN KEY `fk_Response_Pack`;

-- DropForeignKey
ALTER TABLE `Options` DROP FOREIGN KEY `fk_Response_User`;

-- DropTable
DROP TABLE `Options`;

-- CreateTable
CREATE TABLE `Option` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `pack_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` VARCHAR(255) NULL,
    `content` VARCHAR(255) NOT NULL,
    `price_ht` DOUBLE NULL,
    `price_ttc` DOUBLE NULL,

    INDEX `fk_Response_User_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `fk_Response_User` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `fk_Response_Pack` FOREIGN KEY (`pack_id`) REFERENCES `Pack`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
