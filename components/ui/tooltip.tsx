'use client';

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Provider>{children}</TooltipPrimitive.Provider>;
}

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>;
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content className="px-2 py-1 bg-black text-white text-xs rounded">
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export const Tooltip = TooltipPrimitive.Root;
