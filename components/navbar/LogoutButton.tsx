"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button className="flex justify-center w-10 bg-red-950 rounded hover:bg-red-900 hover:cursor-pointer" onClick={() => signOut()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="size-8 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"/>
            </svg>
        </button>
    );
}