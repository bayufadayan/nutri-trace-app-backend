/*
  Warnings:

  - The values [SUPPLIER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `AIAgentExplanation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Batch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageUrl` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `traceCode` on the `Batch` table. All the data in the column will be lost.
  - The primary key for the `Nutrition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `Nutrition` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Certification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupplyChainLog` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nutritionId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `materialName` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `producerId` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrCode` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batchId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrCode` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('PENDING', 'DELIVERED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DistributionStatus" AS ENUM ('IN_TRANSIT', 'DELIVERED');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SUPERADMIN', 'PRODUCER', 'DISTRIBUTOR', 'NUTRITIONIST');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."AIAgentExplanation" DROP CONSTRAINT "AIAgentExplanation_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AIAgentExplanation" DROP CONSTRAINT "AIAgentExplanation_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Batch" DROP CONSTRAINT "Batch_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Certification" DROP CONSTRAINT "Certification_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Nutrition" DROP CONSTRAINT "Nutrition_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SupplyChainLog" DROP CONSTRAINT "SupplyChainLog_batchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SupplyChainLog" DROP CONSTRAINT "SupplyChainLog_userId_fkey";

-- DropIndex
DROP INDEX "public"."Batch_traceCode_key";

-- DropIndex
DROP INDEX "public"."Nutrition_productId_key";

-- AlterTable
ALTER TABLE "AIAgentExplanation" DROP CONSTRAINT "AIAgentExplanation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AIAgentExplanation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AIAgentExplanation_id_seq";

-- AlterTable
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_pkey",
DROP COLUMN "imageUrl",
DROP COLUMN "productId",
DROP COLUMN "traceCode",
ADD COLUMN     "materialName" TEXT NOT NULL,
ADD COLUMN     "producerId" TEXT NOT NULL,
ADD COLUMN     "qrCode" TEXT NOT NULL,
ADD COLUMN     "status" "BatchStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Batch_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Batch_id_seq";

-- AlterTable
ALTER TABLE "Nutrition" DROP CONSTRAINT "Nutrition_pkey",
DROP COLUMN "productId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Nutrition_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Nutrition_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "supplierId",
ADD COLUMN     "batchId" TEXT NOT NULL,
ADD COLUMN     "nutritionId" TEXT,
ADD COLUMN     "qrCode" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "public"."Certification";

-- DropTable
DROP TABLE "public"."SupplyChainLog";

-- CreateTable
CREATE TABLE "Distribution" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "driverName" TEXT NOT NULL,
    "truckId" TEXT NOT NULL,
    "fromLocation" TEXT NOT NULL,
    "toLocation" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "receivedAt" TIMESTAMP(3),
    "status" "DistributionStatus" NOT NULL DEFAULT 'IN_TRANSIT',
    "userId" TEXT,

    CONSTRAINT "Distribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_nutritionId_key" ON "Product"("nutritionId");

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD CONSTRAINT "Distribution_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD CONSTRAINT "Distribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_nutritionId_fkey" FOREIGN KEY ("nutritionId") REFERENCES "Nutrition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAgentExplanation" ADD CONSTRAINT "AIAgentExplanation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAgentExplanation" ADD CONSTRAINT "AIAgentExplanation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
