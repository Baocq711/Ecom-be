/*
  Warnings:

  - A unique constraint covering the columns `[name,size,color,material,orderId]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OrderItem_name_size_color_material_key";

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_name_size_color_material_orderId_key" ON "OrderItem"("name", "size", "color", "material", "orderId");
