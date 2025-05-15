import React from "react"

import { auth } from "@/auth"
import { redirect } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { HardDrive, MapIcon, MapPin, Phone, TreePine } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import config from "@/lib/config"
import { cn, formatPhoneNumber, getInitials } from "@/lib/utils"

import dummyProperties from "@/dummyProperties.json"

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  if (!session) {
    redirect("/sign-in") // Redireciona para a página de login
    return null // Retorna null enquanto redireciona
  }

  const property = dummyProperties.find((prop) => prop.id === params.id)

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
  const whatsappUrl = `https://api.whatsapp.com/send?phone=55${property.phone}&text=`

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
          {property.tags.map((tags, index) => (
            <Badge
              key={index}
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
            <a href={mapsUrl} target="_blank">
              <MapPin size={24} strokeWidth={1.5} className="w-full" />
            </a>
          </button>
        </div>

        <div className="badges flex gap-2 mt-6 w-full">
          {property.features?.map((feature, index) => (
            <Badge
              key={index}
              className="capitalize rounded-md py-2 px-4 min-w-[132px] gap-2 justify-center bg-blue-500 hover:bg-primary-admin/80"
            >
              <TreePine /> {feature.name}
            </Badge>
          ))}
        </div>

        <div className="agents mt-6">
          <h2 className="text-xl font-semibold mb-5">Agenciado por</h2>
          <div className="agents flex gap-7 mt-6">
            {property.agents?.map((agents, index) => (
              <div className="agent-profile flex gap-2" key={index}>
                <Avatar>
                  <Image
                    src={`${config.env.imagekit.urlEndpoint}${agents.imageUrl}`}
                    alt={`Profile Image ${session.user.fullname}`}
                    width={40}
                    height={40}
                    className="object-cover rounded-sm"
                  />
                  <AvatarFallback className="bg-gray-200">
                    {getInitials(agents.name || "ND")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col max-md:hidden">
                  <p className="font-semibold text-dark-200">{agents.name}</p>
                  <p className="text-xs text-light-500">{agents.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="description mt-6">
          <h2 className="text-xl font-semibold mb-5">Descrição</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>
      </div>

      <div className="w-2/4 overflow-hidden gap-6 flex flex-col">
        <div
          className={cn(
            "flex flex-col justify-center text-center w-full h-[120px] rounded-xl",
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
            <p className="font-semibold text-2xl text-[#444444]">
              {session?.user?.name}
            </p>
            <p className="text-[#525252]">Proprietário</p>
            <button className="border border-primary-admin text-primary-admin justify-center text-center py-2 px-6 mt-5 rounded-lg flex gap-2">
              <a className="flex gap-2" href={whatsappUrl} target="_blank">
                <Phone strokeWidth={1.5} />
                {formatPhoneNumber(property.phone)}
              </a>
            </button>
          </div>
        </div>

        <div className="quickaccess p-5 bg-slate-50 flex flex-col rounded-md">
          <h3 className="font-medium text-[#444444]">Acesso rápido</h3>

          {[
            {
              title: "Google Drive",
              description: "Acesse o material deste imóvel.",
              url: property.driveUrl,
              icon: <HardDrive size={32} strokeWidth={1.5} />,
            },
            {
              title: "Ver imóvel",
              description: "Acesse a página deste imóvel.",
              url: property.driveUrl,
              icon: <HardDrive size={32} strokeWidth={1.5} />,
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 mt-6">
              <a
                href={item.url}
                target="_blank"
                className="p-2 bg-[#EBEDF8] text-primary-admin rounded-sm"
              >
                {item.icon}
              </a>
              <div>
                <h4 className="text-base text-[#444] font-medium">
                  {item.title}
                </h4>
                <p className="text-sm text-[#525252]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page
