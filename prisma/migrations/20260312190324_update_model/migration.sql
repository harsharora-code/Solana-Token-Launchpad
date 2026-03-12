/*
  Warnings:

  - Added the required column `WalletAddress` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `launchId` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `txnSignature` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "WalletAddress" TEXT NOT NULL,
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "launchId" INTEGER NOT NULL,
ADD COLUMN     "totalCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "txnSignature" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
