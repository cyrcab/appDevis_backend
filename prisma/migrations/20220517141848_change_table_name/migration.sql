-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(45) NOT NULL,
    `lastName` VARCHAR(45) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NULL,
    `password` VARCHAR(255) NOT NULL,
    `mail` VARCHAR(45) NOT NULL,
    `modified_by` VARCHAR(45) NULL,

    UNIQUE INDEX `mail_UNIQUE`(`mail`),
    INDEX `fk_User_Role_idx`(`role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NULL,
    `content` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `modified_by` VARCHAR(45) NULL,

    INDEX `fk_Response_User1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NULL,
    `name` VARCHAR(45) NOT NULL,
    `modified_by` VARCHAR(45) NULL,

    INDEX `fk_Category_User1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category_has_Question` (
    `category_id` INTEGER UNSIGNED NOT NULL,
    `question_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_Category_has_Question_Category1_idx`(`category_id`),
    INDEX `fk_Category_has_Question_Question1_idx`(`question_id`),
    PRIMARY KEY (`category_id`, `question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `lastname` VARCHAR(45) NOT NULL,
    `firstname` VARCHAR(45) NOT NULL,
    `company` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `mail` VARCHAR(45) NOT NULL,
    `created_number` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Offer` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NULL,
    `modified_by` VARCHAR(45) NULL,
    `description` LONGTEXT NULL,
    `name` VARCHAR(45) NOT NULL,
    `price` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_Offer_User1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estimate` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `category_id` INTEGER UNSIGNED NOT NULL,
    `offer_id` INTEGER UNSIGNED NOT NULL,
    `offer_user_id` INTEGER UNSIGNED NOT NULL,
    `offer_response_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `price` DATETIME(0) NOT NULL,
    `customer_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_Estimate_Category1_idx`(`category_id`),
    INDEX `fk_Estimate_Offer1_idx`(`offer_id`, `offer_user_id`, `offer_response_id`),
    INDEX `fk_Estimate_User1_idx`(`user_id`),
    INDEX `fk_Estimate_customer1_idx`(`customer_id`),
    PRIMARY KEY (`id`, `customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estimate_has_Question` (
    `estimate_id` INTEGER UNSIGNED NOT NULL,
    `question_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_Estimate_has_Question_Estimate1_idx`(`estimate_id`),
    INDEX `fk_Estimate_has_Question_Question1_idx`(`question_id`),
    PRIMARY KEY (`estimate_id`, `question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `date` DATETIME(0) NOT NULL,
    `is_read` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NULL,
    `is_public` BOOLEAN NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `indication` VARCHAR(255) NULL,
    `modified_by` VARCHAR(45) NULL,
    `has_multiple_choice` BOOLEAN NOT NULL,

    INDEX `fk_Question_User1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question_has_Response` (
    `question_id` INTEGER UNSIGNED NOT NULL,
    `answer_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_Question_has_Response_Question1_idx`(`question_id`),
    INDEX `fk_Question_has_Response_Response1_idx`(`answer_id`),
    PRIMARY KEY (`question_id`, `answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_has_Notification` (
    `user_id` INTEGER UNSIGNED NOT NULL,
    `notification_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_User_has_Notification_Notification1_idx`(`notification_id`),
    INDEX `fk_User_has_Notification_User1_idx`(`user_id`),
    PRIMARY KEY (`user_id`, `notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `fk_User_Role` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `fk_Response_User1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `fk_Category_User1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Category_has_Question` ADD CONSTRAINT `fk_Category_has_Question_Category1` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Category_has_Question` ADD CONSTRAINT `fk_Category_has_Question_Question1` FOREIGN KEY (`question_id`) REFERENCES `Question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `fk_Offer_User1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Estimate` ADD CONSTRAINT `fk_Estimate_User1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Estimate` ADD CONSTRAINT `fk_Estimate_Category1` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Estimate` ADD CONSTRAINT `fk_Estimate_customer1` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Estimate_has_Question` ADD CONSTRAINT `fk_Estimate_has_Question_Estimate1` FOREIGN KEY (`estimate_id`) REFERENCES `Estimate`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Estimate_has_Question` ADD CONSTRAINT `fk_Estimate_has_Question_Question1` FOREIGN KEY (`question_id`) REFERENCES `Question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `fk_Question_User1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Question_has_Response` ADD CONSTRAINT `fk_Question_has_Response_Response1` FOREIGN KEY (`answer_id`) REFERENCES `Answer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Question_has_Response` ADD CONSTRAINT `fk_Question_has_Response_Question1` FOREIGN KEY (`question_id`) REFERENCES `Question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User_has_Notification` ADD CONSTRAINT `fk_User_has_Notification_User1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User_has_Notification` ADD CONSTRAINT `fk_User_has_Notification_Notification1` FOREIGN KEY (`notification_id`) REFERENCES `Notification`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
