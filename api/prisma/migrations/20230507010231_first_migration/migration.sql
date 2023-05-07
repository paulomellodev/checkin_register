-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkin_date" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" DATE NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "checkin_date_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkin_time" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "time" TIME(4) NOT NULL,
    "dateId" UUID NOT NULL,

    CONSTRAINT "checkin_time_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");

-- AddForeignKey
ALTER TABLE "checkin_date" ADD CONSTRAINT "checkin_date_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkin_time" ADD CONSTRAINT "checkin_time_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "checkin_date"("id") ON DELETE CASCADE ON UPDATE CASCADE;
