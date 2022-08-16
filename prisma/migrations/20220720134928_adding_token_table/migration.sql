-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `refreshToken` VARCHAR(255) NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_Token_User_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
