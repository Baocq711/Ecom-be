-- This is an empty migration.

CREATE UNIQUE INDEX "category_root_name_uniq"
ON "Category" (lower("name"))
WHERE "parentId" IS NULL;

CREATE UNIQUE INDEX "category_child_name_uniq"
ON "Category" ("parentId", lower("name"))
WHERE "parentId" IS NOT NULL;