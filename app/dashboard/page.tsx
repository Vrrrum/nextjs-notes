"use client";

import Navbar from "@/components/navbar/Navbar";
import {useEffect, useState} from "react";
import {Note} from "@/types/notes";
import MarkdownEditor from "@/components/markodwnEditor/MarkdownEditor";
import MarkdownPreview from "@/components/markdownPreview/MarkdownPreview";

export default function DashboardPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

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
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'o') {
                event.preventDefault();
                handleMarkdownButtonClick();
                console.log("Ctrl + O pressed");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleMarkdownButtonClick = () => {
        setIsEditing(prev => !prev);
    }

    useEffect(() => {
        if(!selectedNote) return;

        const timeout = setTimeout(() => {
            try {
                fetch("/api/notes",
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(selectedNote),
                    },
                );
            } catch (e) {
                console.error("Error updating note:", e);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [selectedNote?.content]);


    return (
        <div className="flex flex-row h-screen w-screen">
            <Navbar setNotes={setNotes} notes={notes} selectedNoteId={selectedNoteId} setSelectedNoteId={setSelectedNoteId}/>
            <div className="size-full">
                <div className="px-2 flex flex-row justify-between items-center bg-neutral-800">
                    <div>
                        <div className="w-full text-3xl font-bold ">{selectedNote?.title || "..."}</div>
                        <div className="w-full text-m">Path/to/note</div>
                    </div>
                    <div>
                        <button className="text-white rounded-md px-4 py-2 ms-3 hover:bg-neutral-600 bg-neutral-700" onClick={handleMarkdownButtonClick}>
                            { isEditing ? "Markdown" : "Edit" }
                        </button>
                    </div>
                </div>
                <div className="h-13/14">
                    {
                        (selectedNote) ?
                            (
                                (isEditing) ?
                                    <MarkdownEditor noteContent={selectedNote.content} handleNoteContentChange={handleNoteContentChange} />
                                    : <MarkdownPreview content={selectedNote.content} />
                            )
                        : "No notes available"
                    }
                </div>
            </div>
        </div>
    );
}