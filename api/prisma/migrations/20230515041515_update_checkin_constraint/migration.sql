/*
  Warnings:

  - You are about to drop the column `date` on the `checkin_hour` table. All the data in the column will be lost.
  - Added the required column `time` to the `checkin_hour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkin" ALTER COLUMN "total_hours" DROP NOT NULL;

-- AlterTable
ALTER TABLE "checkin_hour" DROP COLUMN "date",
ADD COLUMN     "time" TIME NOT NULL;
