import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { desc, eq } from "drizzle-orm"
import { capitalizeFirstLetter, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { IKImage } from "imagekitio-next"
import config from "@/lib/config"
import Image from "next/image"
import { User } from "next-auth"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Eye, Pencil, Trash } from "lucide-react"

const Page = async () => {
  const session = await auth()

  if (!session) {
    redirect("/sign-in") // Redireciona para a página de login
    return null // Retorna null enquanto redireciona
  }

  const userList = await db
    .select()
    .from(users)
    .limit(10)
    .where(eq(users.companyId, session.user.companyId))
    .orderBy(desc(users.createdAt))

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Usuários</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/users/new" className="text-white">
            + Novo Usuário
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="text-sm font-bold">
              <TableHead>Nome e E-mail</TableHead>
              <TableHead>Tipo de usuário</TableHead>
              <TableHead>Gênero</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Cadastrado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.map((user) => (
              <TableRow
                className="text-sm font-semibold font-ibm-plex-sans mt-5 text-[#1E293B]"
                key={user.id}
              >
                <TableCell className="font-medium">
                  <div className="flex flex-row gap-2 items-center">
                    <Avatar>
                      <AvatarFallback className="bg-gray-200">
                        <Image
                          src={`${config.env.imagekit.urlEndpoint}${user.image}`}
                          alt={`Profile Image ${user.fullname}`}
                          width={40}
                          height={40}
                          className="object-cover rounded-full"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col max-md:hidden">
                      <p className="font-semibold">{user.fullname}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{capitalizeFirstLetter(user.role)}</TableCell>
                <TableCell>{user.genre || "Não informado"}</TableCell>
                <TableCell>{user.phone ?? "N/A"}</TableCell>
                <TableCell>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("pt-BR")
                    : "N/A"}
                </TableCell>
                <TableCell>Empty</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Page
