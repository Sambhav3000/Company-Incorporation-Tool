/*
  Warnings:

  - You are about to drop the column `type` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "type",
ADD COLUMN     "numberOfShareholders" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalCapital" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Shareholder" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Shareholder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompanyShareholders" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CompanyShareholders_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CompanyShareholders_B_index" ON "_CompanyShareholders"("B");

-- AddForeignKey
ALTER TABLE "_CompanyShareholders" ADD CONSTRAINT "_CompanyShareholders_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyShareholders" ADD CONSTRAINT "_CompanyShareholders_B_fkey" FOREIGN KEY ("B") REFERENCES "Shareholder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
