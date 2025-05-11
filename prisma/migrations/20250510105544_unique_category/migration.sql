/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
DROP INDEX IF EXISTS "Category_name_key";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
