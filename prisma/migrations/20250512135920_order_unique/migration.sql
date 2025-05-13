/*
  Warnings:

  - A unique constraint covering the columns `[name,size,color,material]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_name_size_color_material_key" ON "OrderItem"("name", "size", "color", "material");
