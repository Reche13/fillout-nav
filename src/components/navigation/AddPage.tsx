"use client";
import { motion } from "motion/react";
import { useNavStore } from "@/store/useNavStore";
import { Plus } from "lucide-react";

export const AddPage = () => {
  const { insertItem, items } = useNavStore();

  const addPage = () => {
    insertItem(items.length - 1);
  };
  return (
    <motion.button
      layout
      onClick={addPage}
      className="cursor-pointer px-2.5 py-1.5 flex items-center gap-2 rounded-lg border-[0.5px] border-border shadow-fillout outline-none focus-visible:border-[#2F72E2] focus-visible:ring-[1.5px] focus-visible:ring-[#2F72E240] focus-visible:bg-background-pri backdrop-blur-3xl bg-background-pri"
    >
      <Plus className="text-dark-pri size-4" strokeWidth={1.5} />
      <span className="text-sm leading-[20px] font-medium whitespace-nowrap select-none text-dark-pri">
        Add page
      </span>
    </motion.button>
  );
};
