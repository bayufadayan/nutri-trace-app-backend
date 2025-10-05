import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const prisma = new PrismaClient();

// folder untuk simpan QR code
const qrFolder = path.resolve('public/qrcodes');
if (!fs.existsSync(qrFolder)) fs.mkdirSync(qrFolder, { recursive: true });

export async function createBatch({ producerId, materialName, weight, status }) {
    // generate batch id manual
    const batchId = crypto.randomUUID();

    // generate QR code
    const qrPath = path.join(qrFolder, `${batchId}.png`);
    await QRCode.toFile(qrPath, batchId, { type: 'png' });
    const qrUrl = `/qrcodes/${batchId}.png`;

    // create batch dengan qrCode
    const batch = await prisma.batch.create({
        data: {
            id: batchId,
            producerId,
            materialName,
            weight,
            status,
            qrCode: qrUrl
        }
    });

    return batch;
}

export async function getAllBatches() {
    return prisma.batch.findMany();
}

export async function getBatchById(id) {
    return prisma.batch.findUnique({ where: { id } });
}

export async function updateBatch(id, data) {
    return prisma.batch.update({ where: { id }, data });
}

export async function deleteBatch(id) {
    const batch = await prisma.batch.findUnique({ where: { id } });
    if (batch && batch.qrCode) {
        const filePath = path.resolve('public', batch.qrCode.substring(1));
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    return prisma.batch.delete({ where: { id } });
}
