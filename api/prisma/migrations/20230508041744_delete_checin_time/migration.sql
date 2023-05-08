/*
  Warnings:

  - You are about to drop the `checkin_date` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `checkin_time` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "checkin_date" DROP CONSTRAINT "checkin_date_userId_fkey";

-- DropForeignKey
ALTER TABLE "checkin_time" DROP CONSTRAINT "checkin_time_dateId_fkey";

-- DropTable
DROP TABLE "checkin_date";

-- DropTable
DROP TABLE "checkin_time";

-- CreateTable
CREATE TABLE "checkin" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" DATE NOT NULL,
    "userId" UUID NOT NULL,
    "total_hours" TIME(4),

    CONSTRAINT "checkin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "checkin" ADD CONSTRAINT "checkin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
