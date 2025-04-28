// components/ui/delete-button.tsx
"use client"

import { Trash2 } from "lucide-react"
import { ConfirmationModal } from "./dialog/ConfirmDialog"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface DeleteButtonProps {
  id: string
  deleteAction: (id: string) => Promise<{ success: boolean; message?: string }>
  itemType: string
  className?: string
}

export function DeleteButton({
  id,
  deleteAction,
  itemType,
  className = "bg-red-400 rounded-full p-2 text-white hover:bg-red-500",
}: DeleteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    const result = await deleteAction(id) // ← Chama a ação injetada

    if (result.success) {
      toast({ title: "Sucesso", description: `${itemType} deletado(a)!` })
    } else {
      toast({
        title: "Erro",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className={className}>
        <Trash2 size={20} />
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleDelete}
        title={`Deletar ${itemType}?`}
        description={`Esta ação não pode ser desfeita.`}
      />
    </>
  )
}
