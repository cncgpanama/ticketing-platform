/*
  Warnings:

  - A unique constraint covering the columns `[payment_oper]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orders_payment_oper_key" ON "orders"("payment_oper");
