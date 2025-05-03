/*
  Warnings:

  - The primary key for the `Otp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type` on the `Otp` table. All the data in the column will be lost.
  - Added the required column `otpType` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otp" DROP CONSTRAINT "Otp_pkey",
DROP COLUMN "type",
ADD COLUMN     "otpType" "OTPType" NOT NULL,
ADD CONSTRAINT "Otp_pkey" PRIMARY KEY ("email", "otpType");
