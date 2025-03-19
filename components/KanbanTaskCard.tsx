import { Column, Task } from "@/types"
import { Button } from "./ui/button"
import { Pencil, Trash } from "lucide-react"
import { useState } from "react"
import { Textarea } from "./ui/textarea"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface Props {
  task: Task
  deleteTask: (id: Column["id"]) => void
  updateTask: (id: Column["id"], content: string) => void
}

const KanbanTaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editedContent, setEditedContent] = useState(task.content)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
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
        className="flex text-left items-center rounded-md bg-slate-800 p-3 cursor-grab justify-between h-[60px] opacity-50"
      >
        {task.content}
      </div>
    )
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={styles}
        {...attributes}
        {...listeners}
        className="flex items-center rounded-lg cursor-pointer justify-between py-2 px-3 bg-zinc-100 border text-gray-500 shadow-sm hover:bg-zinc-50"
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        onClick={() => setModalOpen(true)}
      >
        <div className="flex flex-col">
          <span className="my-auto w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-base font-normal">
            {task.content}
          </span>
        </div>

        {mouseIsOver && (
          <Button
            className="hover:bg-zinc-100 w-[20px] h-[20px] p-0"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation() // impede abrir o modal ao clicar no botão
              deleteTask(task.id)
            }}
          >
            <Trash size={16} />
          </Button>
        )}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar tarefa</DialogTitle>
          </DialogHeader>
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Edite o conteúdo da tarefa"
            className="mt-4"
          />
          <DialogFooter>
            <Button
              onClick={() => {
                updateTask(task.id, editedContent)
                setModalOpen(false)
              }}
            >
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default KanbanTaskCard
