// src/service/distributionService.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createDistribution({ batchId, driverName, truckId, fromLocation, toLocation, sentAt, userId }) {
    return prisma.distribution.create({
        data: {
            batchId,
            driverName,
            truckId,
            fromLocation,
            toLocation,
            sentAt,
            userId
        }
    });
}

export async function getAllDistributions() {
    return prisma.distribution.findMany();
}

export async function getDistributionById(id) {
    return prisma.distribution.findUnique({ where: { id } });
}

export async function updateDistribution(id, data) {
    return prisma.distribution.update({ where: { id }, data });
}

export async function deleteDistribution(id) {
    return prisma.distribution.delete({ where: { id } });
}
