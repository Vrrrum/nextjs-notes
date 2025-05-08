"use client";

import { redirect } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import {useSession} from "next-auth/react";
import {useEffect, useRef, useState} from "react";
import {Note} from "@/types/notes";

export default function DashboardPage() {
    const {data: session} = useSession();
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

    if (!session) {
        redirect("/login");
    }

    const selectedNote = notes.find(note => note.id === selectedNoteId);

    const handleNoteContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedNotes = notes.map(note =>
            note.id === selectedNoteId
                ? { ...note, content: e.target.value }
                : note
        );
        setNotes(updatedNotes);
    };

    useEffect(() => {
        fetch("/api/notes",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedNote),
            },
        );
    }, [selectedNote]);


    return (
        <div className="flex flex-row h-screen w-screen">
            <Navbar setNotes={setNotes} notes={notes} selectedNoteId={selectedNoteId} setSelectedNoteId={setSelectedNoteId}/>
            <div className="size-full">
                <div className="ps-2 grid grid-cols-1 w-full h-1/14 bg-neutral-900">
                    <div className="w-full text-3xl font-bold ">{selectedNote?.title}</div>
                    <div className="w-full text-m">Path/to/note</div>
                </div>
                <div className="h-13/14">
                    {
                        (selectedNote) ?
                        <textarea
                            value={selectedNote.content}
                            className="block w-full h-full resize-none"
                            onChange={handleNoteContentChange}>
                        </textarea>
                        : "No notes available"
                    }
                </div>
            </div>
        </div>
    );
}