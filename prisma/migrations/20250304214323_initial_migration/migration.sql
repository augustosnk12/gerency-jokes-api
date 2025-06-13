-- CreateEnum
CREATE TYPE "JokeStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Joke" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "answer" TEXT,
    "categoryId" TEXT NOT NULL,
    "status" "JokeStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Joke_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Joke" ADD CONSTRAINT "Joke_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
