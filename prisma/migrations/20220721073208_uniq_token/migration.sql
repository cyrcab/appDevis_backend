/*
  Warnings:

  - You are about to alter the column `refreshToken` on the `Token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(320)`.
  - A unique constraint covering the columns `[refreshToken]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refreshToken]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Token` MODIFY `refreshToken` VARCHAR(320) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `refreshToken_UNIQUE` ON `Token`(`refreshToken`);

-- CreateIndex
CREATE UNIQUE INDEX `Token_refreshToken_key` ON `Token`(`refreshToken`);
