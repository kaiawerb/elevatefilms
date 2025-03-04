import { Button } from "@/components/ui/button"
import BookForm from "@/components/admin/forms/BookForm"
import Link from "next/link"
import React from "react"
import CompanyForm from "@/components/admin/forms/CompanyForm"

const Page = () => {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/companies">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <CompanyForm />
      </section>
    </>
  )
}

export default Page
