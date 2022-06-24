-- DropForeignKey
ALTER TABLE `Answer` DROP FOREIGN KEY `fk_Response_Question`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `fk_Question_Category`;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `fk_Response_Question` FOREIGN KEY (`question_id`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `fk_Question_Category` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
