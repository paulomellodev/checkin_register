/*
  Warnings:

  - Made the column `total_hours` on table `checkin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "checkin" ALTER COLUMN "total_hours" SET NOT NULL;

-- CreateTable
CREATE TABLE "checkin_hour" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIME NOT NULL,
    "checkinId" UUID NOT NULL,

    CONSTRAINT "checkin_hour_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "checkin_hour" ADD CONSTRAINT "checkin_hour_checkinId_fkey" FOREIGN KEY ("checkinId") REFERENCES "checkin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
