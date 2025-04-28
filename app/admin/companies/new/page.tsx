import { Button } from "@/components/ui/button"
import BookForm from "@/components/admin/forms/BookForm"
import Link from "next/link"
import React from "react"
import CompanyForm from "@/components/admin/forms/CompanyForm"
import { ArrowLeft } from "lucide-react"

const Page = () => {
  return (
    <>
      <Button className="back-btn shadow-sm" asChild>
        <Link href="/admin/users">
          <ArrowLeft /> Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <CompanyForm />
      </section>
    </>
  )
}

export default Page
