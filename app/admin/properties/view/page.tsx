import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import PropertyCard from "@/components/property/PropertyCard"

import PlaceHolderImage from "@/public/images/placeholdertemp.png"
import dummyProperties from "@/dummyProperties.json"
import { Badge } from "@/components/ui/badge"
import { MapIcon, MapPin, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import config from "@/lib/config"

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
          <Badge className="rounded-full p-2 min-w-[100px] justify-center">
            Urbano
          </Badge>
          <Badge className="rounded-full p-2 min-w-[100px] justify-center">
            Rural
          </Badge>
        </div>

        <div className="address flex w-full justify-between items-center mt-6">
          <div className="adress-info flex gap-1 flex-col">
            <h1 className="text-2xl font-semibold">
              Morro do Leôncio, Taquara - RS
            </h1>
            <span className="flex gap-1">
              <MapIcon color="#E54C60" /> Anita Garibaldi, 1033.
            </span>
          </div>

          <button className="bg-red-400 text-white w-[120px] justify-center text-center h-[40px] rounded-lg">
            <MapPin size={24} strokeWidth={1.5} className="w-full" />
          </button>
        </div>

        <div className="address mt-8">
          <h2 className="text-xl font-semibold mb-5">Agenciado por</h2>
          <div className="agents flex gap-7">
            <div className="agent-profile flex gap-2">
              <Avatar>
                <AvatarFallback className="bg-gray-200">
                  <Image
                    src={`${config.env.imagekit.urlEndpoint}${session.user.image}`}
                    alt={`Profile Image ${session.user.fullname}`}
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                  />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-md:hidden">
                <p className="font-semibold text-dark-200">Carlos Manoel</p>
                <p className="text-xs text-light-500">Avaliador</p>
              </div>
            </div>
            <div className="agent-profile flex gap-2">
              <Avatar>
                <AvatarFallback className="bg-gray-200">
                  <Image
                    src={`${config.env.imagekit.urlEndpoint}${session.user.image}`}
                    alt={`Profile Image ${session.user.fullname}`}
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                  />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-md:hidden">
                <p className="font-semibold text-dark-200">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-light-500">Corretor & Avaliador</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/4 overflow-hidden gap-3 flex flex-col">
        <div className="status flex flex-col justify-center text-center w-full h-[100px] bg-[#E52B44] rounded-xl">
          <h3 className="font-medium uppercase text-xl text-white">Vendido</h3>
          <span className="text-white uppercase">Contrato em 03/07/2023</span>
        </div>

        <div className="owner-profile bg-light-100 flex flex-col justify-center p-8 rounded-md items-center">
          <div className="justify-center flex mb-5">
            <Image
              src={`${config.env.imagekit.urlEndpoint}${session.user.image}`}
              alt={`Profile Image ${session.user.fullname}`}
              className="rounded-sm"
              width={100}
              height={100}
            />
          </div>

          <div className="flex flex-col max-md:hidden items-center">
            <p className="font-semibold text-xl text-[#444444]">
              {session?.user?.name}
            </p>
            <p className="text-[#525252]">Proprietário</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
