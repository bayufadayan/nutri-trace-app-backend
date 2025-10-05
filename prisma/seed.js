import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Konfigurasi akun superadmin default
    const defaultAdmin = {
        name: "Super Admin",
        email: "admin@nutritrace.id",
        password: "supersecure123", // ganti pas produksi
        role: "SUPERADMIN",
        profileImage: null,
    };

    // Hash password
    const hashedPassword = await bcrypt.hash(defaultAdmin.password, 10);

    // Cek apakah sudah ada superadmin
    const existing = await prisma.user.findUnique({
        where: { email: defaultAdmin.email },
    });

    if (existing) {
        console.log("✅ Super Admin already exists:", existing.email);
    } else {
        const created = await prisma.user.create({
            data: {
                name: defaultAdmin.name,
                email: defaultAdmin.email,
                password: hashedPassword,
                role: defaultAdmin.role,
                profileImage: defaultAdmin.profileImage,
            },
        });
        console.log("✅ Super Admin created:", created.email);
    }
}

main()
    .catch((e) => {
        console.error("❌ Error seeding super admin:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
