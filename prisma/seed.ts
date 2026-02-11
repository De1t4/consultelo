import { PrismaClient } from "@/generated/prisma/client";
import { UserUncheckedCreateInput } from "@/generated/prisma/models/User";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env["EMAIL_ADDRESS"] as string;
  const adminPassword = process.env["ADMIN_PASSWORD"] as string;
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin: UserUncheckedCreateInput = await prisma.user.create({
      data: {
        username: "superadmin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        phone: "123456789",
      },
    });

    console.log(`Created admin user: ${admin.username} (${admin.email})`);
  } else {
    console.log(`Admin user already exists: ${existingAdmin.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
