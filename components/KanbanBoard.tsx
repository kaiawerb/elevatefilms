"use client"

import React, { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Column } from "@/types"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import KanbanColumnContainer from "./KanbanColumnContainer"
import { createPortal } from "react-dom"

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([])
  const columnsId = useMemo(() => columns.map((column) => column.id), [columns])

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  )
  return (
    <main>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <Button
          className="max-w-44"
          variant="outline"
          onClick={() => {
            createNewColumn()
          }}
        >
          + Add Column
        </Button>

        <div className="flex gap-4 mt-10">
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <KanbanColumnContainer
                column={column}
                key={column.id}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
              />
            ))}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumnContainer
                deleteColumn={deleteColumn}
                column={activeColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </main>
  )

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    }

    setColumns([...columns, columnToAdd])
  }

  function deleteColumn(id: Column["id"]) {
    const filteredColumns = columns.filter((column) => column.id !== id)
    setColumns(filteredColumns)
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      )

      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      )

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function updateColumn(id: Column["id"], title: string) {
    const newColumns = columns.map((column) => {
      if (column.id !== id) return column

      return { ...column, title }

      setColumns(newColumns)
    })
  }

  function generateId() {
    return Math.floor(Math.random() * 1001)
  }
}

export default KanbanBoard
