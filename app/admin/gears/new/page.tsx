import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
import GearForm from "@/components/admin/forms/GearForm"

const Page = () => {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/gears">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <GearForm />
      </section>
    </>
  )
}

export default Page
