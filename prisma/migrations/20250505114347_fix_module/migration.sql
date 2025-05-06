/*
  Warnings:

  - The values [REFRESHTOKEN,OTP] on the enum `Module` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `roleId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Module_new" AS ENUM ('AUTH', 'FILE', 'PERMISSION', 'PRODUCT', 'ROLE', 'USER', 'VARIANT');
ALTER TABLE "Permission" ALTER COLUMN "module" TYPE "Module_new" USING ("module"::text::"Module_new");
ALTER TYPE "Module" RENAME TO "Module_old";
ALTER TYPE "Module_new" RENAME TO "Module";
DROP TYPE "Module_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
