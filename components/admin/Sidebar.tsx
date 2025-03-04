"use client"

import { adminSideBarLinks } from "@/constants"
import { cn, getInitials } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Session } from "next-auth"
import { LogOutIcon } from "lucide-react"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react" // Import correto para client-side

const Sidebar = ({ session }: { session: Session }) => {
  const pathName = usePathname()

  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src="/icons/admin/logo.svg"
            alt="Logo"
            height={37}
            width={37}
          />

          <h1>Syncwise</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route != "/admin" &&
                pathName.includes(link.route) &&
                link.route.length) ||
              pathName === link.route

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      className={`${isSelected ? "brightness-0 invert" : ""}  object-contain`}
                      src={link.img}
                      alt={link.text}
                      fill
                    />
                  </div>
                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="user items-center">
        <Avatar>
          <AvatarFallback className="bg-gray-200">
            {getInitials(session?.user?.name || "JD")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          <p className="text-xs text-light-500">{session?.user?.email}</p>
        </div>

        <Button
          className="rounded-full hover:bg-transparent"
          variant="ghost"
          onClick={() => signOut()}
        >
          <LogOutIcon className="text-red-600" />
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
