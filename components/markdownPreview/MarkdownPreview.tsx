import {marked} from "marked";

marked.use({
    breaks: true,
});

export default function MarkdownPreview({ content }: { content: string }) {
    return (
        <div className="markdown-preview">
            <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
        </div>
    );
}