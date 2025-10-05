import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import path from "path";
import QRCode from "qrcode";
import fs from "fs";

const qrFolder = path.resolve("public/qrcodes");

// Pastikan folder ada
if (!fs.existsSync(qrFolder)) fs.mkdirSync(qrFolder, { recursive: true });

export const createProduct = async (data) => {
    const { batches, userId, nutritionId, ...rest } = data;

    // create product dulu tanpa qrCode dan batches
    const product = await prisma.product.create({
        data: {
            ...rest,
            user: userId ? { connect: { id: userId } } : undefined,
            nutrition: nutritionId ? { connect: { id: nutritionId } } : undefined,
        },
    });

    // generate QR code berisi product.id
    const qrPath = path.join(qrFolder, `${product.id}.png`);
    await QRCode.toFile(qrPath, product.id, { type: "png" });

    // update product dengan qrCode path relatif
    const qrUrl = `/qrcodes/${product.id}.png`;
    const updatedProduct = await prisma.product.update({
        where: { id: product.id },
        data: { qrCode: qrUrl },
    });

    // handle batches (many-to-many)
    if (batches?.length) {
        await Promise.all(
            batches.map((b) =>
                prisma.productBatch.create({
                    data: {
                        productId: product.id,
                        batchId: b.batchId,
                    },
                })
            )
        );
    }

    // ambil lagi product lengkap dengan relasi
    return prisma.product.findUnique({
        where: { id: product.id },
        include: { batches: true, nutrition: true, user: true },
    });
};

export const getAllProducts = async () => {
    return await prisma.product.findMany({ include: { nutrition: true, batches: true, user: true } });
};

export const getProductById = async (id) => {
    return await prisma.product.findUnique({ where: { id }, include: { nutrition: true, batches: true, user: true } });
};

export const updateProduct = async (id, data) => {
    return await prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id) => {
    // hapus semua relasi product-batch dulu
    await prisma.productBatch.deleteMany({ where: { productId: id } });

    // hapus product
    return await prisma.product.delete({ where: { id } });
};

