import { PrismaClient } from '@/app/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = body;

        // Walidacja
        if (!email || !username || !password) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
        }

        // Sprawdź, czy email już istnieje
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return new Response(JSON.stringify({ error: 'Email is already registered' }), { status: 400 });
        }

        // Hashuj hasło
        const hashedPassword = await bcrypt.hash(password, 10);

        // Zapisz nowego użytkownika
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });

        // Nie zwracaj hasła w odpowiedzi!
        const { password: _, ...safeUser } = user;

        return new Response(JSON.stringify(safeUser), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
