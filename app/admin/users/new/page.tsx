import UserForm from "@/components/admin/forms/UserForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

const Page = () => {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/users">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <UserForm />
      </section>
    </>
  )
}

export default Page
