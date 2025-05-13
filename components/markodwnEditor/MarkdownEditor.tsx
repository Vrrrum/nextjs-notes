type props = {
    noteContent: string;
    handleNoteContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function MarkdownEditor({noteContent, handleNoteContentChange}: props) {
  return (
      <textarea
          value={noteContent}
          className="block w-full h-full resize-none"
          onChange={handleNoteContentChange}>
      </textarea>
  );
}