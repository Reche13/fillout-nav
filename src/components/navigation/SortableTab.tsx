import { cn } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisVertical, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { ContextMenu } from "./ContextMenu";

export const SortableTab = ({
  item: { id, label, icon: Icon },
  activeId,
  setActiveId,
}: {
  item: {
    id: UniqueIdentifier;
    label: string;
    icon: LucideIcon;
  };
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
  } = useSortable({ id });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition,
    zIndex: isDragging ? "50" : "10",
  };

  const isActive = id === activeId;

  const [contextOpen, setContextOpen] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextOpen(true);
  };

  return (
    <div className={cn("relative", isDragging ? "z-50" : "z-10")} ref={tabRef}>
      <ContextMenu
        open={contextOpen}
        setOpen={setContextOpen}
        tabRef={tabRef}
      />

      <motion.div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setActiveId(id)}
        onContextMenu={handleContextMenu}
        className={cn(
          "group cursor-pointer px-2.5 py-1.5 flex items-center gap-2 rounded-lg border-[0.5px] border-border shadow-fillout outline-none focus-visible:border-[#2F72E2] focus-visible:ring-[1.5px] focus-visible:ring-[#2F72E240] focus-visible:bg-background-pri backdrop-blur-3xl",
          isActive
            ? "bg-background-pri"
            : "bg-background-sec hover:bg-background-ter shrink-0",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        animate={{
          width: isActive ? "auto" : "fit-content",
          transition: { duration: 0.3 },
        }}
      >
        <Icon
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
          {label}
        </span>

        <motion.button
          initial={{ width: 0 }}
          animate={{ width: isActive ? "16px" : "0px" }}
          className="overflow-hidden cursor-pointer"
          onClick={handleContextMenu}
        >
          <EllipsisVertical
            strokeWidth={1.5}
            className="size-4 text-[#9DA4B2]"
          />
        </motion.button>
      </motion.div>
    </div>
  );
};
