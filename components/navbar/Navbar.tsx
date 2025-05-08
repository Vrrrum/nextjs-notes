"use client";

import NavbarHeader from "./NavbarHeader";
import {useEffect, useState} from "react";
import NewNotePopup from "@/components/addNote/NewNotePopup";

type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export default function Navbar() {
    const [showNewNotePopup, setShowNewNotePopup] = useState(false);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch("/api/notes",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(r => r.json()).then(data => {
                setNotes(data);
            });
    }, [showNewNotePopup]);

    return (
        <div className="bg-neutral-800 w-50 h-full">
            <NavbarHeader/>
            <div className="flex flex-col gap-2 p-2">
                {notes.map((note: Note) => (
                    <div key={note.id} className="bg-neutral-700 p-2 rounded-lg hover:bg-neutral-600 cursor-pointer">
                        <div className="text-lg font-semibold">{note.title}</div>
                        <div className="text-sm text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</div>
                    </div>
                ))}
            </div>
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