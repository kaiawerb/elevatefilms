// components/delete-button.tsx
"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { deleteUser } from "@/lib/admin/actions/users/deleteUser"
import { ConfirmationModal } from "./dialog/ConfirmDialog"

export function DeleteButton({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    const result = await deleteUser(id)

    if (result.success) {
      toast({
        title: "Sucesso",
        description: "Usuário deletado com sucesso",
      })
    } else {
      toast({
        title: "Erro",
        description: result.message || "Falha ao deletar usuário",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-400 rounded-full p-2 text-white hover:bg-red-500 transition-colors"
      >
        <Trash2 size={20} strokeWidth={1.5} />
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleDelete}
        title="Confirmar exclusão"
        description="Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
      />
    </>
  )
}
