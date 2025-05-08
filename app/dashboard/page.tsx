import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import {PrismaClient} from "@/app/generated/prisma";

const prisma = new PrismaClient();

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user?.email },
        include: { notes: true },
    })

    const notes = user?.notes || [];

    for(const note of notes) {
        console.log(note);
    }

    return (
        <div className="flex flex-row h-screen w-screen">
            <Navbar/>
            <div className="size-full">
                <div className="ps-2 grid grid-cols-1 w-full h-1/14 bg-neutral-900">
                    <div className="w-full text-3xl font-bold ">New note</div>
                    <div className="w-full text-m">Path/to/note</div>
                </div>
                <div className="h-13/14">
                    {
                        (notes.length > 0) ? <textarea className="block w-full h-full resize-none"></textarea> : "No notes available"
                    }
                </div>
            </div>
        </div>
    );
}