import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/lib/auth";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function DELETE(request: Request, {params}: {params: { id: string }}): Promise<NextResponse | undefined> {
    const session: Session | null = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const {id} = params;

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user?.email },
        });

        if (!user) {
            return NextResponse.json("User not found", { status: 404 });
        }

        if (!id) {
            return NextResponse.json("Invalid id", { status: 400 });
        }

        const note = await prisma.note.delete({
            where: { id },
        });

        return NextResponse.json(note, {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}