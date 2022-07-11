/*
  Warnings:

  - You are about to alter the column `price_ht` on the `File` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `price_ttc` on the `File` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `reduction` on the `File` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `price_ht` on the `Options` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `price_ttc` on the `Options` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `price_ht` on the `Pack` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `price_ttc` on the `Pack` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `File` MODIFY `price_ht` DOUBLE NOT NULL,
    MODIFY `price_ttc` DOUBLE NOT NULL,
    MODIFY `reduction` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Options` MODIFY `price_ht` DOUBLE NULL,
    MODIFY `price_ttc` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Pack` MODIFY `price_ht` DOUBLE NULL,
    MODIFY `price_ttc` DOUBLE NULL;
