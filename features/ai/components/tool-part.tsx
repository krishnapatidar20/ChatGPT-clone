"use client";

import { ToolWebSearch } from "./tool-web-search";

type Props = {
  part: any;
};

export function ToolPart({ part }: Props) {
  switch (part.type) {
    case "step-start":
      return (
        <div className="text-sm text-muted-foreground italic">
          🤔 Thinking...
        </div>
      );

    case "tool-webSearch":
      return <ToolWebSearch part={part} />;

    default:
      return null;
  }
}