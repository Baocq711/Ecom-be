/*
  Warnings:

  - Made the column `discount` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discountType` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "images" TEXT[],
ALTER COLUMN "discount" SET NOT NULL,
ALTER COLUMN "discountType" SET NOT NULL;
