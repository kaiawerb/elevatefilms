import { Column, Task } from "@/types"
import React, { useMemo, useState } from "react"
import { Ellipsis, PlusIcon } from "lucide-react"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import KanbanTaskCard from "./BoardTaskCard"
import { Button } from "@/components/ui/button"

interface Props {
  column: Column
  deleteColumn: (id: Column["id"]) => void
  updateColumn: (id: Column["id"], title: string) => void
  createTask: (columnId: Column["id"]) => void
  deleteTask: (id: Task["id"]) => void
  updateTask: (
    id: Task["id"],
    content: string,
    description?: string,
    priority?: "low" | "medium" | "high",
    category?: string,
    media?: string[],
    comments?: string[]
  ) => void
  tasks: Task[]
}

function KanbanColumnContainer(props: Props) {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    deleteTask,
    updateTask,
    tasks,
  } = props

  const [editMode, setEditMode] = useState(false)

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  })

  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={styles}
        className="flex flex-col bg-zinc-200 w-[276px] min-w-[276px] opacity-70 max-h-[456px] text-white rounded-sm "
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={styles}
      className="flex flex-col p-4 shadow-sm rounded-md bg-athensgrey-50 w-[276px] min-w-[276px] max-h-[476px]"
    >
      <div
        className="flex cursor-grab items-center justify-between"
        {...attributes}
        {...listeners}
      >
        <div
          className="w-auto text-athensgrey-800 text-base font-semibold"
          onClick={() => {
            setEditMode(true)
          }}
        >
          {!editMode && column.title}
          {editMode && (
            <input
              className="border-none bg-zinc-100 text-gray-600"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false)
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return
                setEditMode(false)
              }}
            />
          )}
        </div>

        <Button
          className="hover:bg-zinc-100 p-3"
          variant={"ghost"}
          onClick={() => deleteColumn(column.id)}
        >
          <Ellipsis className="text-gray-500" />
        </Button>
      </div>

      <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-auto mb-2 mt-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <KanbanTaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      <Button
        className="justify-start bg-transparent!important text-sm text-slate-500 border-0 shadow-none p-2 hover:bg-athensgrey-200"
        onClick={() => {
          createTask(column.id)
        }}
      >
        <PlusIcon className="text-gray-500" />
        Adicionar um cartão
      </Button>
    </div>
  )
}

export default KanbanColumnContainer
