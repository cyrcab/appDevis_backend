-- DropForeignKey
ALTER TABLE `Option` DROP FOREIGN KEY `fk_Response_Pack`;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `fk_Response_Pack` FOREIGN KEY (`pack_id`) REFERENCES `Pack`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
