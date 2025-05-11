/*
  Warnings:

  - A unique constraint covering the columns `[path,method]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,device,ip]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
DROP INDEX IF EXISTS "Permission_path_method_key";
CREATE UNIQUE INDEX "Permission_path_method_key" ON "Permission"("path", "method");

-- CreateIndex
DROP INDEX IF EXISTS "RefreshToken_userId_device_ip_key";
CREATE UNIQUE INDEX "RefreshToken_userId_device_ip_key" ON "RefreshToken"("userId", "device", "ip");

-- CreateIndex
DROP INDEX IF EXISTS "Role_name_key";
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
