-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Launch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Symbol" TEXT NOT NULL,
    "description" TEXT,
    "totalSupply" INTEGER NOT NULL,
    "pricePerToken" DOUBLE PRECISION NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "maxPerWallet" INTEGER NOT NULL,

    CONSTRAINT "Launch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteListEntry" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "WhiteListEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
