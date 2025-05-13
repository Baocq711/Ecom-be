-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Module" ADD VALUE 'CART';
ALTER TYPE "Module" ADD VALUE 'ORDER';
ALTER TYPE "Module" ADD VALUE 'CATEGORY';
ALTER TYPE "Module" ADD VALUE 'CART_ITEM';
ALTER TYPE "Module" ADD VALUE 'PAYMENT';
