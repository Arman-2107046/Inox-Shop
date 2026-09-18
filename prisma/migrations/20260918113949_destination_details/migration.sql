/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Destination` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Destination" DROP CONSTRAINT "Destination_categoryId_fkey";

-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "categoryId",
ADD COLUMN     "exclusions" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "groupSize" TEXT NOT NULL DEFAULT 'Max 10',
ADD COLUMN     "inclusions" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "itinerary" JSONB NOT NULL DEFAULT '[]';

-- CreateTable
CREATE TABLE "_CategoryToDestination" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToDestination_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToDestination_B_index" ON "_CategoryToDestination"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToDestination" ADD CONSTRAINT "_CategoryToDestination_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDestination" ADD CONSTRAINT "_CategoryToDestination_B_fkey" FOREIGN KEY ("B") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;
