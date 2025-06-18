"use client";

import { Clipboard, Copy, Flag, PencilLineIcon, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";

interface ContextMenuProps {
  open: boolean;
  tabRef: React.RefObject<HTMLElement | null>;
  setOpen: (v: boolean) => void;
}

export const ContextMenu = ({ open, tabRef, setOpen }: ContextMenuProps) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!tabRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [tabRef, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.15 }}
          className="origin-bottom-left absolute left-0 -top-4 -translate-y-full z-50 min-w-[240px] rounded-xl border-[0.5px] border-border bg-background-pri shadow-fillout"
        >
          <div className="text-base font-semibold text-dark-pri leading-[24px] tracking-tight p-3 border-b-[0.5px] border-border">
            Settings
          </div>
          <div className="flex flex-col py-1">
            <div
              onClick={() => setOpen(false)}
              className="px-3 py-2 flex items-center gap-1.5 hover:bg-background-sec/70 cursor-pointer"
            >
              <Flag
                fill="#2F72E2"
                className="text-[#2F72E2] size-4"
                strokeWidth={1.5}
              />
              <span className="text-dark-pri font-medium text-sm leading-[16px]">
                Set as first page
              </span>
            </div>

            <div
              onClick={() => setOpen(false)}
              className="px-3 py-2 flex items-center gap-1.5 hover:bg-background-sec/70 cursor-pointer"
            >
              <PencilLineIcon
                className="text-[#9da4b2] size-4"
                strokeWidth={1.5}
              />
              <span className="text-dark-pri font-medium text-sm leading-[16px]">
                Rename
              </span>
            </div>
            <div
              onClick={() => setOpen(false)}
              className="px-3 py-2 flex items-center gap-1.5 hover:bg-background-sec/70 cursor-pointer"
            >
              <Clipboard className="text-[#9da4b2] size-4" strokeWidth={1.5} />
              <span className="text-dark-pri font-medium text-sm leading-[16px]">
                Copy
              </span>
            </div>
            <div
              onClick={() => setOpen(false)}
              className="px-3 py-2 flex items-center gap-1.5 hover:bg-background-sec/70 cursor-pointer"
            >
              <Copy className="text-[#9da4b2] size-4" strokeWidth={1.5} />
              <span className="text-dark-pri font-medium text-sm leading-[16px]">
                Duplicate
              </span>
            </div>
          </div>

          <div
            onClick={() => setOpen(false)}
            className="border-t-[0.5px] border-border p-3 flex items-center gap-1.5 hover:bg-destruct/5 rounded-b-[10px] cursor-pointer"
          >
            <Trash2 className="text-destruct size-4" strokeWidth={1.5} />
            <span className="text-destruct font-medium text-sm leading-[16px]">
              Delete
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
