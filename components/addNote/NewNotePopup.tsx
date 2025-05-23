import {useState} from "react";

export default function NewNotePopup({setShowNewNotePopup}: {setShowNewNotePopup: (state: boolean) => void}) {
    const [newNoteTitle, setNewNoteTitle] = useState("");

    const handleBackdropClick = () => {
        setShowNewNotePopup(false);
    };

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCreateNote();
        }
    };

    const handleCreateNote = () => {
        setShowNewNotePopup(false);

        try {
            fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: newNoteTitle,
                    content: "",
                }),
            }).then(r => r.json()).then(data => {
                console.log("Note created:", data);
            });
        } catch (error) {
            console.error("Error creating note:", error);
        }
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full flex backdrop-blur-sm items-center justify-center" onClick={handleBackdropClick}>
            <div className="bg-neutral-700 p-4 rounded shadow-lg" onClick={stopPropagation}>
                <h2 className="text-xl font-bold mb-4">Create New Note</h2>
                <form  onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                    <input type="text"
                           value={newNoteTitle}
                           onChange={(e) => setNewNoteTitle(e.target.value)}
                           onKeyDown={handleKeyDown}
                           placeholder="New note"
                           className="p-2 border rounded" />
                    <button type="button"  onClick={handleCreateNote} className="button">Create Note</button>
                </form>
            </div>
        </div>
    );
}