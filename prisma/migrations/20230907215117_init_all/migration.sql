-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "UserId" INTEGER,
    "GameId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "reviewId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("reviewId","userId")
);

-- CreateTable
CREATE TABLE "Dislikes" (
    "reviewId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dislikedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dislikes_pkey" PRIMARY KEY ("reviewId","userId")
);

-- CreateTable
CREATE TABLE "Favourites" (
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Favourites_pkey" PRIMARY KEY ("userId","gameId")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislikes" ADD CONSTRAINT "Dislikes_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislikes" ADD CONSTRAINT "Dislikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
