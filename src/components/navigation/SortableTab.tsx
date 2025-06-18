import { cn } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisVertical, FileText } from "lucide-react";
import { motion } from "motion/react";

export const SortableTab = ({
  item,
  activeId,
  setActiveId,
}: {
  item: { id: UniqueIdentifier; label: string };
  activeId: UniqueIdentifier;
  setActiveId: (id: UniqueIdentifier) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition,
    zIndex: isDragging ? "50" : "10",
  };

  const isActive = item.id === activeId;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => setActiveId(item.id)}
      className={cn(
        "group cursor-pointer px-2.5 py-1.5 flex items-center gap-2 rounded-lg border-[0.5px] border-border shadow-fillout outline-none focus-visible:border-[#2F72E2] focus-visible:ring-[1.5px] focus-visible:ring-[#2F72E240] focus-visible:bg-background-pri backdrop-blur-3xl",
        isActive
          ? "bg-background-pri"
          : "bg-background-sec hover:bg-background-ter shrink-0"
      )}
      animate={{
        width: isActive ? "auto" : "fit-content",
        transition: { duration: 0.3 },
      }}
    >
      <FileText
        className={cn(
          "size-5",
          isActive ? "text-primary" : "text-[#8C93A1]",
          "group-focus-visible:text-primary"
        )}
        strokeWidth={1.5}
      />
      <span
        className={cn(
          "text-sm leading-[20px] font-medium whitespace-nowrap select-none",
          isActive ? "text-dark-pri" : "text-dark-sec",
          "group-focus-visible:text-dark-pri"
        )}
      >
        {item.label}
      </span>

      <motion.button
        initial={{ width: 0 }}
        animate={{ width: isActive ? "16px" : "0px" }}
        className="overflow-hidden cursor-pointer"
        onClick={() => console.log("menu click")}
      >
        <EllipsisVertical strokeWidth={1.5} className="size-4 text-[#9DA4B2]" />
      </motion.button>
    </motion.div>
  );
};
