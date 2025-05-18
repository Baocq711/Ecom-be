-- This is an empty migration.

CREATE UNIQUE INDEX "Category_name_parentId_where_NOT_NULL_key" ON "Category"("name", "parentId") WHERE "parentId" IS NOT NULL;