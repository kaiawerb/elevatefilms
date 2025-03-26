import { Column, Task } from "@/types"
import { Trash } from "lucide-react"
import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  task: Task
  deleteTask: (id: Column["id"]) => void
  updateTask: (
    id: Task["id"],
    content: string,
    description?: string,
    priority?: "low" | "medium" | "high",
    category?: string,
    media?: string[],
    comments?: string[]
  ) => void
}

const BoardTaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editedContent, setEditedContent] = useState(task.content)
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  )
  const [editedPriority, setEditedPriority] = useState<
    "low" | "medium" | "high"
  >(task.priority || "medium")
  const [editedCategory, setEditedCategory] = useState(task.category || "")

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

  const getPriorityBadgeClasses = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return "bg-green-200 text-green-800"
      case "medium":
        return "bg-yellow-200 text-yellow-800"
      case "high":
        return "bg-red-200 text-red-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={styles}
        className="flex text-left items-center rounded-md bg-slate-800 p-3 cursor-grab justify-between h-[32px] opacity-20"
      ></div>
    )
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={styles}
        {...attributes}
        {...listeners}
        className="flex items-center rounded-lg cursor-pointer justify-between py-2 px-3 bg-white border text-gray-500 shadow-sm hover:bg-zinc-50"
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        onClick={() => setModalOpen(true)}
      >
        <div className="flex items-center space-x-2">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">
            {task.content}
          </span>
          {task.priority && (
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${getPriorityBadgeClasses(
                task.priority as "low" | "medium" | "high"
              )}`}
            >
              {task.priority === "low"
                ? "Baixa"
                : task.priority === "medium"
                  ? "Normal"
                  : "Alta"}
            </span>
          )}
        </div>

        {mouseIsOver && (
          <Button
            className="hover:bg-zinc-100 w-[20px] h-[20px] p-0"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              deleteTask(task.id)
            }}
          >
            <Trash size={16} />
          </Button>
        )}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">
              Editar Tarefa
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Campo para o título */}
            <Input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Título da tarefa"
              className="w-full"
            />
            {/* Campo para a descrição */}
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Descrição da tarefa"
              className="w-full resize-none"
              rows={3}
            />
            {/* Campos em grid para Categoria e Prioridade */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                placeholder="Categoria"
                className="w-full"
              />
              <Select
                value={editedPriority}
                onValueChange={(value) =>
                  setEditedPriority(value as "low" | "medium" | "high")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Normal</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button
              onClick={() => {
                updateTask(
                  task.id,
                  editedContent,
                  editedDescription,
                  editedPriority,
                  editedCategory,
                  [], // media (ajuste conforme necessário)
                  [] // comments (ajuste conforme necessário)
                )
                setModalOpen(false)
              }}
              className="w-full"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BoardTaskCard
