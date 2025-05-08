"use client";

import NavbarHeader from "./NavbarHeader";
import {useState} from "react";
import NewNotePopup from "@/components/addNote/NewNotePopup";

export default function Navbar() {
    const [showNewNotePopup, setShowNewNotePopup] = useState(false);

    return (
        <div className="bg-neutral-800 w-50 h-full">
            <NavbarHeader/>
            <div className="flex justify-center p-1 mx-2 text-xl bg-neutral-700 rounded-xl hover:bg-neutral-600 hover:cursor-pointer" onClick={() => setShowNewNotePopup(true)}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                </div>
            </div>

            {showNewNotePopup && <NewNotePopup setShowNewNotePopup={setShowNewNotePopup} />}
        </div>
    );
}