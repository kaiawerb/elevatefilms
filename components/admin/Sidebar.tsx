"use client"

import { adminSideBarLinks } from "@/constants"
import { cn, getInitials } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Session } from "next-auth"
import { LogOutIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"
import { useState } from "react"

const Sidebar = ({ session }: { session: Session }) => {
  const pathName = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "admin-sidebar transition-all duration-300",
        collapsed ? "w-[100px] px-4" : "w-[332px] px-5"
      )}
    >
      <div>
        <div className="logo relative flex items-center justify-between">
          <div className="flex items-center gap-2 max-md:justify-center">
            <Image
              src="/icons/admin/logo.svg"
              alt="Logo"
              height={37}
              width={37}
            />
            {!collapsed && <h1>Syncwise</h1>}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-primary-admin hover:text-primary-admin/80 transition-all"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-2">
          {adminSideBarLinks.map((link) => {
            const isActive =
              (link.route !== "/admin" && pathName.includes(link.route)) ||
              pathName === link.route

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link group cursor-pointer hover:bg-primary-admin/90 hover:shadow",
                    isActive && "bg-primary-admin shadow-sm",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <div className="relative size-6 max-md:size-5 transition-all">
                    <Image
                      className={cn(
                        "object-contain transition-all",
                        isActive && "brightness-0 invert",
                        "group-hover:brightness-0 group-hover:invert"
                      )}
                      src={link.img}
                      alt={link.text}
                      fill
                    />
                  </div>
                  {!collapsed && (
                    <p
                      className={cn(
                        "transition-all",
                        isActive ? "text-white" : "text-dark",
                        "group-hover:text-white"
                      )}
                    >
                      {link.text}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div
        className={cn("user items-center", collapsed && "justify-center px-2")}
      >
        <Avatar>
          <AvatarFallback className="bg-gray-200">
            {getInitials(session?.user?.name || "JD")}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex flex-col max-md:hidden">
            <p className="font-semibold text-dark-200">{session?.user?.name}</p>
            <p className="text-xs text-light-500">{session?.user?.email}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
