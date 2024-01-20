-- CreateEnum
CREATE TYPE "JokeStatus" AS ENUM ('new', 'approved', 'denied');

-- CreateTable
CREATE TABLE "Joke" (
    "id" SERIAL NOT NULL,
    "joke" TEXT NOT NULL,
    "status" "JokeStatus" NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Joke_pkey" PRIMARY KEY ("id")
);
