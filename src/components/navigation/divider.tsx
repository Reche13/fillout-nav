import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const Divider = ({ index }: { index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border h-5"
    >
      <motion.div
        initial={{ padding: "0px 10px" }}
        animate={{ padding: hovered ? "0px 20px" : "0px 10px" }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.button
              transition={{ duration: 0.3 }}
              initial={{ scale: 0 }}
              animate={{ scale: hovered ? 1 : 0 }}
              className="rounded-full border p-1 size-4 flex items-center justify-center"
            >
              +
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
