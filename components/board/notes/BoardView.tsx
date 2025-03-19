"use client"

import React, { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Column, Task } from "@/types"
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import BoardColumnContainer from "./BoardColumnContainer"
import { createPortal } from "react-dom"
import BoardTaskCard from "./BoardTaskCard"

const BoardView = () => {
  const [columns, setColumns] = useState<Column[]>([])
  const columnsId = useMemo(() => columns.map((column) => column.id), [columns])

  const [tasks, setTasks] = useState<Task[]>([])

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  )
  return (
    <main className="shadow-xl overflow-x-scroll overflow-y-auto h-[300px]">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <div className="flex gap-4 items-start">
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <BoardColumnContainer
                column={column}
                key={column.id}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                tasks={tasks.filter((task) => task.columnId === column.id)}
              />
            ))}
          </SortableContext>
          <Button
            className="max-w-44"
            variant="outline"
            onClick={() => {
              createNewColumn()
            }}
          >
            + Add Column
          </Button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumnContainer
                updateColumn={updateColumn}
                deleteColumn={deleteColumn}
                column={activeColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <BoardTaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
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

  function createTask(columnId: Column["id"]) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    }

    setTasks([...tasks, newTask])
  }

  function deleteTask(id: Column["id"]) {
    const newTasks = tasks.filter((task) => task.id !== id)

    setTasks(newTasks)
  }

  function updateTask(id: Column["id"], content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task

      return { ...task, content }
    })

    setTasks(newTasks)
  }

  function deleteColumn(id: Column["id"]) {
    const filteredColumns = columns.filter((column) => column.id !== id)
    setColumns(filteredColumns)

    const newTasks = tasks.filter((t) => t.columnId !== id)
    setTasks(newTasks)
  }

  function updateColumn(id: Column["id"], title: string) {
    const newColumns = columns.map((column) => {
      if (column.id !== id) return column

      return { ...column, title }
    })

    setColumns(newColumns)
  }

  function generateId() {
    return Math.floor(Math.random() * 1001)
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column)
      return
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)

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

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === "Task"
    const isOverATask = over.data.current?.type === "Task"

    if (!isActiveATask) return

    // Dropping Task over another task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)

        tasks[activeIndex].columnId = tasks[overIndex].columnId

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    // Dropping Task over a column
    const isOverAColumn = over.data.current?.type === "Column"

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)

        tasks[activeIndex].columnId = overId

        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }
}

export default BoardView
