/*
  Warnings:

  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estimate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estimate_has_Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_has_Notification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mail]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Answer` DROP FOREIGN KEY `fk_Response_Question`;

-- DropForeignKey
ALTER TABLE `Answer` DROP FOREIGN KEY `fk_Response_User`;

-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `fk_Category_User1`;

-- DropForeignKey
ALTER TABLE `Estimate` DROP FOREIGN KEY `fk_Estimate_Category`;

-- DropForeignKey
ALTER TABLE `Estimate` DROP FOREIGN KEY `fk_Estimate_customer`;

-- DropForeignKey
ALTER TABLE `Estimate` DROP FOREIGN KEY `fk_Estimate_User`;

-- DropForeignKey
ALTER TABLE `Estimate_has_Answer` DROP FOREIGN KEY `fk_Estimate_has_Answer_Answer`;

-- DropForeignKey
ALTER TABLE `Estimate_has_Answer` DROP FOREIGN KEY `fk_Estimate_has_Answer_Estimate`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `fk_Question_Category`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `fk_Question_User`;

-- DropForeignKey
ALTER TABLE `User_has_Notification` DROP FOREIGN KEY `fk_User_has_Notification_Notification1`;

-- DropForeignKey
ALTER TABLE `User_has_Notification` DROP FOREIGN KEY `fk_User_has_Notification_User1`;

-- DropTable
DROP TABLE `Answer`;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Estimate`;

-- DropTable
DROP TABLE `Estimate_has_Answer`;

-- DropTable
DROP TABLE `Notification`;

-- DropTable
DROP TABLE `Question`;

-- DropTable
DROP TABLE `User_has_Notification`;

-- CreateTable
CREATE TABLE `Options` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `pack_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` VARCHAR(255) NULL,
    `content` VARCHAR(255) NOT NULL,
    `price_ht` INTEGER NULL,
    `price_ttc` INTEGER NULL,
    `modified_by` VARCHAR(255) NULL,

    INDEX `fk_Response_User_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pack` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(0) NULL,
    `updated_by` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `price_ht` INTEGER NULL,
    `price_ttc` INTEGER NULL,

    INDEX `fk_Category_User_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `File` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `pack_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `price` INTEGER UNSIGNED NOT NULL,
    `customer_id` INTEGER UNSIGNED NOT NULL,
    `created_by` VARCHAR(255) NULL,
    `updated_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(0) NULL,
    `type` VARCHAR(255) NOT NULL,
    `price_ht` INTEGER NOT NULL,
    `price_ttc` INTEGER NOT NULL,
    `reduction` INTEGER NULL,

    INDEX `fk_Estimate_Pack_idx`(`pack_id`),
    INDEX `fk_Estimate_User_idx`(`user_id`),
    INDEX `fk_Estimate_customer_idx`(`customer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `mail_UNIQUE` ON `Customer`(`mail`);

-- AddForeignKey
ALTER TABLE `Options` ADD CONSTRAINT `fk_Response_User` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Options` ADD CONSTRAINT `fk_Response_Pack` FOREIGN KEY (`pack_id`) REFERENCES `Pack`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Pack` ADD CONSTRAINT `fk_Category_User1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `fk_Estimate_User` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `fk_Estimate_Category` FOREIGN KEY (`pack_id`) REFERENCES `Pack`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `fk_Estimate_customer` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
