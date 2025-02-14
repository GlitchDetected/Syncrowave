import * as React from "react";

import { cn } from "~/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, readOnly, ...props }, ref) => {
        return (
            <input
                className={cn(
                    "flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    readOnly && "focus-visible:ring-background",
                    className
                )}
                ref={ref}
                readOnly={readOnly}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };