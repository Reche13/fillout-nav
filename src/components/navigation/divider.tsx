import { useNavStore } from "@/store/useNavStore";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const Divider = ({ index }: { index: number }) => {
  const { insertItem } = useNavStore();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center h-5 relative z-20"
    >
      <motion.div
        initial={{ padding: "0px 10px" }}
        animate={{ padding: hovered ? "0px 20px" : "0px 10px" }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.button
              onClick={() => insertItem(index)}
              transition={{ duration: 0.3 }}
              initial={{ scale: 0 }}
              animate={{ scale: hovered ? 1 : 0 }}
              className="cursor-pointer bg-background-pri shadow-fillout rounded-full border-border p-1 border flex items-center justify-center z-20 relative"
            >
              <Plus className="text-dark-pri size-2" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
