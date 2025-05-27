/*
  Warnings:

  - A unique constraint covering the columns `[slug,parentId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_parentId_key" ON "Category"("slug", "parentId");
CREATE UNIQUE INDEX "Product_slug_deletedAt_key" ON "Product"("slug") WHERE "deletedAt" IS NULL;
