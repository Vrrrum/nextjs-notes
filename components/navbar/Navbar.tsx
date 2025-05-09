"use client";

import NavbarHeader from "./NavbarHeader";
import React, {useEffect, useState} from "react";
import NewNotePopup from "@/components/addNote/NewNotePopup";
import {Note} from "@/types/notes";
import NotesList from "@/components/navbar/NotesList";

type Props = {
    setNotes: (notes: Note[]) => void;
    notes: Note[];
    selectedNoteId: string | null;
    setSelectedNoteId: (noteId: string) => void | null;
}

const Navbar: React.FC<Props> = ({setNotes, notes, selectedNoteId, setSelectedNoteId}) => {
    const [showNewNotePopup, setShowNewNotePopup] = useState(false);

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
            <NotesList
                notes={notes}
                setNotes={setNotes}
                selectedNoteId={selectedNoteId}
                setSelectedNoteId={setSelectedNoteId} />
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

export default Navbar;