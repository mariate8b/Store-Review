/*
  Warnings:

  - A unique constraint covering the columns `[destinationId,name]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comment_destinationId_name_key" ON "Comment"("destinationId", "name");
