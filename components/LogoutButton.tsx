"use client";

import {signOut} from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            className="bg-red-500 w-12 text-white px-4 py-2 rounded"
            onClick={() => signOut()}
        >
            Logout
        </button>
    )
}