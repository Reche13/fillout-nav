import { motion } from "motion/react";
import { useState } from "react";

export const Divider = ({ index }: { index: number }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const insertItemAt = (index: number) => {
    console.log(index);
  };
  return (
    <motion.div
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative w-8 h-5 border border-gray-400"
    >
      {hoveredIndex === index && (
        <motion.button
          onClick={() => insertItemAt(index + 1)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white rounded-full w-6 h-6 text-sm"
        >
          +
        </motion.button>
      )}
    </motion.div>
  );
};
