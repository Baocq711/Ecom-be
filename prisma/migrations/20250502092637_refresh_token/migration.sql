/*
  Warnings:

  - You are about to drop the column `devices` on the `RefreshToken` table. All the data in the column will be lost.
  - Added the required column `device` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "devices",
ADD COLUMN     "device" TEXT NOT NULL,
ADD COLUMN     "ip" TEXT NOT NULL;
