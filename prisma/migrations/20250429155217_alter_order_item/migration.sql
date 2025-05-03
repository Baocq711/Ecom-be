/*
  Warnings:

  - Made the column `sku` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "sku" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL;
