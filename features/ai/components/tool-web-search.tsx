"use client";

type Props = {
  part: any;
};

export function ToolWebSearch({ part }: Props) {
  const results = part.output?.results ?? [];

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
        <div className="mt-4 space-y-3">
          {results.map((item: any, index: number) => (
            <div
              key={index}
              className="rounded-lg border bg-background p-3"
            >
              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {item.content}
              </p>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-blue-500 hover:underline"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}