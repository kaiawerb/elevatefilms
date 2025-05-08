import React from "react"

import { auth } from "@/auth"
import { redirect } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { HardDrive, MapIcon, MapPin, Phone } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import config from "@/lib/config"
import { cn, getInitials } from "@/lib/utils"

import dummyProperties from "@/dummyProperties.json"
import Link from "next/link"

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const property = dummyProperties.find((prop) => prop.id === params.id)

  if (!session) {
    redirect("/sign-in") // Redireciona para a página de login
    return null // Retorna null enquanto redireciona
  }

  if (!property) {
    redirect("/admin/properties") // Redireciona se não encontrar o imóvel
    return null
  }

  const statusClasses = {
    vendido: "bg-red-500 text-white", // Vermelho
    "a venda": "bg-blue-600 text-white", // Azul
    alugado: "bg-green-500 text-white", // Verde
    reservado: "bg-yellow-400 text-black", // Amarelo
    inativo: "bg-gray-500 text-white", // Cinza
  } as const
  type StatusKey = keyof typeof statusClasses
  // Verificação segura do status
  const getStatusClass = (status: string) => {
    return statusClasses[status as StatusKey] || "bg-blue-600 text-white"
  }

  const mapsUrl = `https://www.google.com/maps?q=${property.coordinates?.lat},${property.coordinates?.lng}`

  return (
    <section className="rounded-2xl bg-white p-8 max-w-screen flex flex-col gap-6 xs:flex-row">
      <div className="w-full overflow-hidden gap-3 flex flex-col">
        <Image
          src={property.image}
          alt={`Propriedade ${property.title}`}
          width={860}
          height={512}
          className="object-cover bg-cover rounded-[12px]"
        />
        <div className="badges flex gap-2 mt-6">
          {property.tags.map((tags) => (
            <Badge
              key={tags}
              className="capitalize rounded-full p-2 min-w-[100px] justify-center bg-primary-admin hover:bg-primary-admin/80"
            >
              {tags}
            </Badge>
          ))}
        </div>

        <div className="address flex w-full justify-between items-center mt-6">
          <div className="adress-info flex gap-1 flex-col">
            <h1 className="text-2xl font-semibold">
              {property.neighborhood}, {property.city} - {property.uf}
            </h1>
            <span className="flex gap-1">
              <MapIcon color={"#25388C"} /> {property.street}
            </span>
          </div>

          <button
            className="bg-primary-admin hover:bg-primary-admin/80 text-white w-[120px] justify-center text-center h-[40px] rounded-lg"
            aria-label="Abrir no Google Maps"
          >
            <Link href={mapsUrl} target="_blank">
              <MapPin size={24} strokeWidth={1.5} className="w-full" />
            </Link>
          </button>
        </div>

        <div className="address mt-6">
          <h2 className="text-xl font-semibold mb-5">Agenciado por</h2>
          <div className="agents flex gap-7">
            <div className="agent-profile flex gap-2">
              <Avatar>
                <Image
                  src={`${config.env.imagekit.urlEndpoint}${session.user.image}`}
                  alt={`Profile Image ${session.user.fullname}`}
                  width={40}
                  height={40}
                  className="object-cover rounded-sm"
                />
                <AvatarFallback className="bg-gray-200">
                  {getInitials(session.user.name || "ND")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-md:hidden">
                <p className="font-semibold text-dark-200">Carlos Manoel</p>
                <p className="text-xs text-light-500">Avaliador</p>
              </div>
            </div>

            <div className="agent-profile flex gap-2">
              <Avatar>
                <Image
                  src={`${config.env.imagekit.urlEndpoint}${session.user.image}`}
                  alt={`Profile Image ${session.user.fullname}`}
                  width={40}
                  height={40}
                  className="object-cover rounded-sm"
                />
                <AvatarFallback className="bg-gray-200">
                  {getInitials(session.user.name || "ND")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-md:hidden">
                <p className="font-semibold text-dark-200">Eduardo Costa</p>
                <p className="text-xs text-light-500">Corretor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-2/4 overflow-hidden gap-6 flex flex-col">
        <div
          className={cn(
            "flex flex-col justify-center text-center w-full h-[100px] rounded-xl",
            getStatusClass(property.status.title)
          )}
        >
          <h3 className="font-medium uppercase text-xl text-white">
            {property.status.title}
          </h3>
          <span className="text-white uppercase">
            {property.status.description}
          </span>
        </div>

        <div className="owner-profile bg-slate-50 flex flex-col justify-center p-8 rounded-md items-center">
          <Image
            src={`${config.env.imagekit.urlEndpoint}${session.user.image}`}
            alt={`Profile Image ${session.user.fullname}`}
            className="rounded-sm justify-center flex mb-5"
            width={100}
            height={100}
          />

          <div className="flex flex-col max-md:hidden items-center">
            <p className="font-semibold text-xl text-[#444444]">
              {session?.user?.name}
            </p>
            <p className="text-[#525252]">Proprietário</p>
            <button className="border border-primary-admin text-primary-admin justify-center text-center py-3 px-6 mt-5 rounded-lg flex gap-2">
              <Phone strokeWidth={1.5} /> 51 9 8049-3798
            </button>
          </div>
        </div>

        <div className="quickacess p-5 bg-slate-50 flex flex-col rounded-md">
          <h3 className="font-medium text-[#444444]">Acesso rapido</h3>
          <div className="quickacess-item flex items-center gap-2 mt-6">
            <span className="p-2 bg-[#EBEDF8] text-primary-admin rounded-sm">
              <HardDrive size={32} strokeWidth={1.5} />
            </span>
            <div className="quickacess-item-info">
              <h4 className="text-base text-[#444] font-medium">
                Google Drive
              </h4>
              <p className="text-sm text-[#525252]">
                Acesse o material deste imóvel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
