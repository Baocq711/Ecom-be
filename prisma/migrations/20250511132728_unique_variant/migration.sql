-- This is an empty migration.

CREATE UNIQUE INDEX "Variant_productId_size_color_material_key" ON "Variant"("productId", "size", "color", "material") 
WHERE "deletedAt" IS NULL;
