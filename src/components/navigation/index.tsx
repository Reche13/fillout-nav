"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import React from "react";
import { Divider } from "./divider";
import { SortableTab } from "./SortableTab";
import { useNavStore } from "@/store/useNavStore";
import { motion } from "motion/react";

export const Navigation = () => {
  const { items, activeId, setActiveId, moveItem, isDragging, setIsDragging } =
    useNavStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveItem(active.id, over.id);
    }
    setIsDragging(false);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 0,
      },
    })
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={() => setIsDragging(true)}
      modifiers={[restrictToHorizontalAxis]}
      sensors={sensors}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="w-full border max-w-2xl p-4 overflow-x-auto">
          <div className="flex items-center relative w-fit">
            <motion.div
              layout
              transition={{ duration: 0.3 }}
              className="border-border border-dashed border h-px absolute inset-x-4 z-0"
            />
            {items.map((item, index) => (
              <motion.div
                {...(!isDragging && { layout: true })}
                key={item.id}
                initial={{ opacity: 1, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 1, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <SortableTab
                  item={item}
                  activeId={activeId}
                  setActiveId={setActiveId}
                />
                {index < items.length - 1 && <Divider index={index} />}
              </motion.div>
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};
