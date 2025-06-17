"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis]}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="w-full border max-w-2xl p-4">
          <div className="flex items-center">
            {items.map((item, index) => (
              <Fragment key={item.id}>
                <SortableTab item={item} />
                {index < items.length - 1 && <Divider index={index} />}
              </Fragment>
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};
