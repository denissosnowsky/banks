/*
  Warnings:

  - Added the required column `month_pay` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "month_pay" DOUBLE PRECISION NOT NULL;
