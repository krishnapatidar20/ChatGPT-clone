import * as React from "react";
import { RiLoaderLine } from "@remixicon/react";

function Spinner({
  className,
  children,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <RiLoaderLine
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={className}
      {...props}
    />
  );
}

export { Spinner };