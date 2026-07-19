"use client";

type Props = {
  part: any;
};

export function ToolWebSearch({ part }: Props) {
  return (
    <div className="my-3 rounded-lg border bg-muted/40 p-4">
      <div className="font-medium">
        🔍 Searching the web
      </div>

      <div className="mt-1 text-sm text-muted-foreground">
        State: {part.state}
      </div>

      {part.input && (
        <div className="mt-2 text-sm">
          <strong>Query:</strong> {part.input.query}
        </div>
      )}

      {part.state === "output-available" && (
        <div className="mt-4 space-y-2">
          {part.output.map((item: any, index: number) => (
            <div
              key={index}
              className="rounded border bg-background p-3"
            >
              <div className="font-medium">
                {item.title}
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}