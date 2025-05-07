import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {signOut} from "next-auth/react";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div>
            Witaj, {session.user.username}!
            <LogoutButton />
        </div>
    );
}