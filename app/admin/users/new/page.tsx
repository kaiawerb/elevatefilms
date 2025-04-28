import UserForm from "@/components/admin/forms/UserForm"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import React from "react"

const Page = () => {
  return (
    <>
      <Button className="back-btn shadow-sm" asChild>
        <Link href="/admin/users">
          <ArrowLeft /> Go Back
        </Link>
      </Button>

      <section className="w-full max-w-3xl">
        <UserForm />
      </section>
    </>
  )
}

export default Page
