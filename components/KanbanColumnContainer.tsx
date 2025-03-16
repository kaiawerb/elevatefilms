import { Column } from "@/types"
import React, { useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { DeleteIcon, Trash } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
interface Props {
  column: Column
  deleteColumn: (id: Column["id"]) => void
  updateColumn: (id: Column["id"], title: string) => void
}

function KanbanColumnContainer(props: Props) {
  const { column, deleteColumn, updateColumn } = props

  const [editMode, setEditMode] = useState(false)

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
        className="flex flex-col bg-slate-900 opacity-70 w-[352px] h-[500px] max-h-[500px] text-white rounded-sm "
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={styles}
      className="flex flex-col bg-slate-900 w-[352px] h-[500px] max-h-[500px] text-white rounded-sm "
    >
      <div
        className="flex text-md h-[60px] bg-slate-800 cursor-grab rounded-md rounded-b-none p-3 font-bold items-center"
        {...attributes}
        {...listeners}
      >
        <div
          className="flex gap-2 items-center justify-between w-full"
          onClick={() => {
            setEditMode(true)
          }}
        >
          <div className="gap-2 flex">
            <Badge className="rounded-full">0</Badge>
            {!editMode && column.title}
            {editMode && (
              <input
                className="bg-slate-800"
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
            variant="ghost"
            onClick={() => {
              deleteColumn(column.id)
            }}
          >
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default KanbanColumnContainer
