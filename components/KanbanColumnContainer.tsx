import { Column, Task } from "@/types"
import React, { useMemo, useState } from "react"
import { Button } from "./ui/button"
import { Ellipsis, PlusIcon } from "lucide-react"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import KanbanTaskCard from "./KanbanTaskCard"
interface Props {
  column: Column
  deleteColumn: (id: Column["id"]) => void
  updateColumn: (id: Column["id"], title: string) => void
  createTask: (columnId: Column["id"]) => void
  deleteTask: (id: Column["id"]) => void
  updateTask: (id: Column["id"], content: string) => void
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
        className="flex flex-col bg-zinc-200 w-[276px] opacity-70 max-h-[456px] text-white rounded-sm "
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={styles}
      className="flex flex-col p-4 shadow-xl rounded-md bg-zinc-200 w-[276px] max-h-[476px]"
    >
      <div
        className="flex cursor-grab items-center justify-between"
        {...attributes}
        {...listeners}
      >
        <div
          className="w-auto text-gray-600 text-base font-semibold"
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
          onClick={() => {}}
        >
          <Ellipsis className="text-gray-500" />
        </Button>
        {/* <div className="flex flex-row gap-4">
          
          <Button
            className="justify-start border text-base text-gray-500 border-none shadow-none bg-white p-0 hover:bg-white"
            onClick={() => {
              deleteColumn(column.id)
            }}
          >
            <Trash />
          </Button>
        </div> */}
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
        className="justify-start bg-zinc-200 text-sm text-slate-500 border-0 shadow-none p-2 hover:bg-zinc-100"
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
