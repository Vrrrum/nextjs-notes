import {PrismaClient} from "@/app/generated/prisma";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/lib/auth";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(): Promise<NextResponse | undefined> {
  const session: Session | null = await getServerSession(authOptions);

  if(!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
      const user = await prisma.user.findUnique({
          where: { email: session.user?.email },
          include: { notes: true },
      });

      if (!user) {
          return NextResponse.json("User not found", { status: 404 });
      }

      return NextResponse.json(user.notes, {
          status: 200,
          headers: { "Content-Type": "application/json" },
      });
  } catch (error) {
      console.error("Error fetching notes:", error);
      return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse | undefined> {
    const session: Session | null = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { title, content } = body;

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user?.email },
        });

        if (!user) {
            return NextResponse.json("User not found", { status: 404 });
        }

        if (!title || typeof title !== "string") {
            return NextResponse.json("Invalid title", { status: 400 });
        }

        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId: user.id,
            },
        });

        return NextResponse.json(note, {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}