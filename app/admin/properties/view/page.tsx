import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import PropertyCard from "@/components/property/PropertyCard"

import PlaceHolderImage from "@/public/images/placeholdertemp.png"
import dummyProperties from "@/dummyProperties.json"
import { Badge } from "@/components/ui/badge"
import { HardDrive, MapIcon, MapPin, Phone, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import config from "@/lib/config"
import { getInitials } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const Page = async () => {
  const session = await auth()

  if (!session) {
    redirect("/sign-in") // Redireciona para a página de login
    return null // Retorna null enquanto redireciona
  }

  return (
    <section className="rounded-2xl bg-white p-8 max-w-screen flex flex-col gap-6 xs:flex-row">
      <div className="w-full overflow-hidden gap-3 flex flex-col">
        <Image
          src={PlaceHolderImage.src}
          alt={`Profile Image ${session.user.fullname}`}
          width={860}
          height={512}
          className="object-cover"
        />
        <div className="badges flex gap-2 mt-6">
          <Badge className="rounded-full p-2 min-w-[100px] justify-center bg-primary-admin hover:bg-primary-admin/80">
            Urbano
          </Badge>
          <Badge className="rounded-full p-2 min-w-[100px] justify-center bg-primary-admin hover:bg-primary-admin/80">
            Rural
          </Badge>
        </div>

        <div className="address flex w-full justify-between items-center mt-6">
          <div className="adress-info flex gap-1 flex-col">
            <h1 className="text-2xl font-semibold">
              Morro do Leôncio, Taquara - RS
            </h1>
            <span className="flex gap-1">
              <MapIcon color={"#25388C"} /> Anita Garibaldi, 1033.
            </span>
          </div>

          <button className="bg-primary-admin hover:bg-primary-admin/80 text-white w-[120px] justify-center text-center h-[40px] rounded-lg">
            <MapPin size={24} strokeWidth={1.5} className="w-full" />
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
        <div className="status flex flex-col justify-center text-center w-full h-[100px] bg-[#E05252] rounded-xl">
          <h3 className="font-medium uppercase text-xl text-white">Vendido</h3>
          <span className="text-white uppercase">Contrato em 03/07/2023</span>
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
