type MarkdownTextProps = {
    content: string;
};

function renderInline(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);

    return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={index} className="font-extrabold text-(--color-primary)">
                    {part.slice(2, -2)}
                </strong>
            );
        }

        return part;
    });
}

export default function MarkdownText({ content }: MarkdownTextProps) {
    const blocks = content.trim().split(/\n\s*\n/);

    return (
        <div className="space-y-4 leading-8 text-[#1A1A1A]/68">
            {blocks.map((block, blockIndex) => {
                const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
                const isList = lines.every((line) => line.startsWith("- "));

                if (isList) {
                    return (
                        <ul key={blockIndex} className="space-y-2">
                            {lines.map((line, lineIndex) => (
                                <li key={lineIndex} className="flex gap-3">
                                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-secondary)" />
                                    <span>{renderInline(line.slice(2))}</span>
                                </li>
                            ))}
                        </ul>
                    );
                }

                if (lines.length === 1 && lines[0].startsWith("### ")) {
                    return (
                        <h3 key={blockIndex} className="font-heading text-lg font-extrabold text-(--color-primary)">
                            {renderInline(lines[0].slice(4))}
                        </h3>
                    );
                }

                return (
                    <p key={blockIndex}>
                        {renderInline(lines.join(" "))}
                    </p>
                );
            })}
        </div>
    );
}
