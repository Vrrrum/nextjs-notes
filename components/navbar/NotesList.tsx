import {Note} from "@/types/notes";
import React from "react";

type Props = {
    notes: Note[];
    selectedNoteId: string | null;
    setSelectedNoteId: (noteId: string) => void | null;
}

const NotesList: React.FC<Props> = ({notes, selectedNoteId, setSelectedNoteId}) => {
    return (
        <div className="flex flex-col gap-2 p-2">
            {notes.map((note: Note) => (
                <div key={note.id} onClick={() => setSelectedNoteId(note.id)} className={`${selectedNoteId != null && selectedNoteId === note.id ? `bg-neutral-600` : 'bg-neutral-700'} p-2 rounded-lg hover:bg-neutral-600 cursor-pointer`}>
                    <div className="text-lg font-semibold">{note.title}</div>
                    <div className="text-sm text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</div>
                </div>
            ))}
        </div>
    )
}

export default NotesList;