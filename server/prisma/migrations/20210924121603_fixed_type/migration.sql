/*
  Warnings:

  - You are about to drop the column `max_laon` on the `Bank` table. All the data in the column will be lost.
  - Added the required column `max_loan` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bank" DROP COLUMN "max_laon",
ADD COLUMN     "max_loan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
