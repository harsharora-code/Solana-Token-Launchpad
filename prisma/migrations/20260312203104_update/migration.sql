/*
  Warnings:

  - Added the required column `creatorId` to the `Launch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `launchId` to the `WhiteListEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Launch" ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WhiteListEntry" ADD COLUMN     "launchId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Tier" (
    "id" SERIAL NOT NULL,
    "minAmount" INTEGER NOT NULL,
    "maxAmount" INTEGER NOT NULL,
    "pricePerToken" DOUBLE PRECISION NOT NULL,
    "launchId" INTEGER NOT NULL,

    CONSTRAINT "Tier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tier_launchId_key" ON "Tier"("launchId");

-- AddForeignKey
ALTER TABLE "Launch" ADD CONSTRAINT "Launch_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tier" ADD CONSTRAINT "Tier_launchId_fkey" FOREIGN KEY ("launchId") REFERENCES "Launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhiteListEntry" ADD CONSTRAINT "WhiteListEntry_launchId_fkey" FOREIGN KEY ("launchId") REFERENCES "Launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_launchId_fkey" FOREIGN KEY ("launchId") REFERENCES "Launch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
