"use client"

import React, { useMemo, useState, useEffect } from "react"
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
  // Inicializa colunas lendo do localStorage
  const [columns, setColumns] = useState<Column[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("board-columns")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  // Inicializa tasks lendo do localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("board-tasks")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const columnsId = useMemo(() => columns.map((column) => column.id), [columns])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    })
  )

  // Sempre salvar alterações no localStorage
  useEffect(() => {
    localStorage.setItem("board-columns", JSON.stringify(columns))
  }, [columns])

  useEffect(() => {
    localStorage.setItem("board-tasks", JSON.stringify(tasks))
  }, [tasks])

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
            onClick={createNewColumn}
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
      description: "",
      createdAt: new Date().toISOString(),
      category: "", // Adicionar uma categoria opcional
      priority: "medium", // Garantindo que o valor é um dos três tipos esperados
      comments: [], // Inicializa com um array vazio de comentários
      media: [], // Inicializa com um array vazio de mídia
    }
    setTasks([...tasks, newTask])
  }

  function deleteTask(id: Task["id"]) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function updateTask(
    id: Task["id"],
    content: string,
    description?: string,
    priority?: "low" | "medium" | "high",
    category?: string,
    media?: string[],
    comments?: string[]
  ) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              content,
              description: description ?? task.description,
              priority: priority ?? task.priority,
              category: category ?? task.category,
              media: media ?? task.media,
              comments: comments ?? task.comments,
            }
          : task
      )
    )
  }

  function deleteColumn(id: Column["id"]) {
    setColumns(columns.filter((column) => column.id !== id))
    setTasks(tasks.filter((task) => task.columnId !== id))
  }

  function updateColumn(id: Column["id"], title: string) {
    setColumns(
      columns.map((column) =>
        column.id === id ? { ...column, title } : column
      )
    )
  }

  function generateId() {
    return Math.floor(Math.random() * 1000000000)
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column)
    } else if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task)
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
      const activeIndex = columns.findIndex((c) => c.id === activeColumnId)
      const overIndex = columns.findIndex((c) => c.id === overColumnId)
      return arrayMove(columns, activeIndex, overIndex)
    })
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id
    if (activeId === overId) return

    const isActiveTask = active.data.current?.type === "Task"
    const isOverTask = over.data.current?.type === "Task"

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)
        tasks[activeIndex].columnId = tasks[overIndex].columnId
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverColumn = over.data.current?.type === "Column"

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        tasks[activeIndex].columnId = overId
        return [...tasks]
      })
    }
  }
}

export default BoardView
