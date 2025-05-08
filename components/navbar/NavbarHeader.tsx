"use client";

import LogoutButton from "@/components/navbar/LogoutButton";
import {useSession} from "next-auth/react";

export default function NavbarHeader() {
    const {data: session} = useSession();

    return (
        <div className="flex flex-row justify-between items-center p-2 text-xl">
            <div className="">{session?.user.username}</div>
            <LogoutButton />
        </div>
    );
}