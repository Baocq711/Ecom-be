/*
  Warnings:

  - A unique constraint covering the columns `[paymentCode]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentCode" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentCode_key" ON "Order"("paymentCode");
