import { PrismaClient } from '@/app/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Walidacja
        if (!email || !password) {
            return new Response(JSON.stringify({error: 'Missing fields'}), {status: 400});
        }

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user || !user.password || !await bcrypt.compare(password, user.password)) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }

        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
        };

        return new Response(JSON.stringify(safeUser), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
