-- This is an empty migration.

DROP INDEX "Order_userId_key";

CREATE UNIQUE INDEX "OrderItem_productId_size_color_material_key" ON "OrderItem" ("name", "size", "color", "material")
