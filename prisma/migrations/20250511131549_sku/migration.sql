/*
  Warnings:

  - You are about to drop the column `sku` on the `Variant` table. All the data in the column will be lost.

*/
-- AlterTable

DROP INDEX "Variant_sku_key";
ALTER TABLE "Variant" DROP COLUMN "sku",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- DropIndex

