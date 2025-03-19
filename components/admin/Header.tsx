import { Session } from "next-auth"
import React from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"
import { LogOutIcon } from "lucide-react"

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          {session?.user?.name}
        </h2>

        <p className="text-slate-500 text-base">
          Monitor all of your users and gears here
        </p>
      </div>
      {/* <Button
        className="rounded-full"
        variant="ghost"
        onClick={() => signOut()}
      >
        <LogOutIcon className="text-red-600" />
      </Button> */}
    </header>
  )
}

export default Header
