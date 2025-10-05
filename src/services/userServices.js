// src/service/userServices.js
import bcrypt from 'bcryptjs';
import pkg from '@prisma/client';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export async function registerUser({ name, email, password, role }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, role }
    });
    return user;
}

export async function loginUser({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid email or password');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid email or password');

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken }
    });

    return { user, accessToken, refreshToken };
}

export async function logoutUser(userId) {
    await prisma.user.update({ where: { id: userId }, data: { refreshToken: null } });
}

export async function getAllUsers() {
    return prisma.user.findMany();
}

export async function getUserById(id) {
    return prisma.user.findUnique({ where: { id } });
}

export async function updateUser(id, data) {
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id) {
    return prisma.user.delete({ where: { id } });
}
