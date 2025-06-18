import { create } from "zustand";
import { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { CheckCircle2, FileText, Info, LucideIcon } from "lucide-react";

type NavItem = {
  id: UniqueIdentifier;
  label: string;
  icon: LucideIcon;
};

interface NavState {
  items: NavItem[];
  activeId: UniqueIdentifier;
  setActiveId: (id: UniqueIdentifier) => void;
  moveItem: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void;
  insertItem: (index: number) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
  items: [
    { id: "1", label: "Info", icon: Info },
    { id: "2", label: "Details", icon: FileText },
    { id: "3", label: "Other", icon: FileText },
    { id: "4", label: "Ending", icon: CheckCircle2 },
  ],
  activeId: "1",
  setActiveId: (id) => set({ activeId: id }),
  moveItem: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.items.findIndex((i) => i.id === activeId);
      const newIndex = state.items.findIndex((i) => i.id === overId);
      if (oldIndex === -1 || newIndex === -1) return {};
      return { items: arrayMove(state.items, oldIndex, newIndex) };
    }),

  insertItem: (index) =>
    set((state) => {
      const newItems = [...state.items];
      const insertAt = Math.min(index + 1, newItems.length);
      newItems.splice(insertAt, 0, {
        id: crypto.randomUUID(),
        label: "Page",
        icon: FileText,
      });
      return { items: newItems };
    }),
  isDragging: false,
  setIsDragging: (dragging) => set({ isDragging: dragging }),
}));
