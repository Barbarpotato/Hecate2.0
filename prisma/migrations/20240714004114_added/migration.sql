/*
  Warnings:

  - Added the required column `created` to the `Typewriter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Typewriter` ADD COLUMN `created` DATETIME(3) NOT NULL;
