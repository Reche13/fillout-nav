"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import React, { Fragment, useState } from "react";
import { Divider } from "./divider";
import { SortableTab } from "./SortableTab";

export const Navigation = () => {
  const [items, setItems] = useState<{ id: UniqueIdentifier; label: string }[]>(
    () => [
      { id: "1", label: "Item 1" },
      { id: "2", label: "Item 2" },
      { id: "3", label: "Item 3" },
      { id: "4", label: "Item 4" },
      { id: "5", label: "Item 5" },
    ]
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier>(items[0].id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
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
      modifiers={[restrictToHorizontalAxis]}
      sensors={sensors}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="w-full border max-w-2xl p-4">
          <div className="flex items-center relative w-fit">
            <div className="border-border border-dashed border h-px absolute inset-x-4 z-0" />
            {items.map((item, index) => (
              <Fragment key={item.id}>
                <SortableTab
                  item={item}
                  activeId={activeId}
                  setActiveId={setActiveId}
                />
                {index < items.length - 1 && <Divider index={index} />}
              </Fragment>
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};
