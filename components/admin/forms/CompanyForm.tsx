"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Company, Gear } from "@/types"
import { companySchema } from "@/lib/validations"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { toast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { createCompany } from "@/lib/admin/actions/company"

interface Props extends Partial<Company> {
  type?: "create" | "update"
}

const CompanyForm = ({ type, ...gear }: Props) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      cnpj: "",
      address: "",
      phone: "",
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof companySchema>) => {
    const result = await createCompany(values)

    if (result.success) {
      toast({
        title: "Success",
        description: "Company created successfully",
      })

      router.push(`/admins/companies/new`)
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  const [date, setDate] = React.useState<Date>()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Company Title
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Company Title"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"cnpj"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Company CNPJ
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Company CNPJ"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"address"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Company Address
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Company Address"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"phone"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Company Phone
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Company Phone"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Company E-mail
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Company E-mail"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="book-form_btn text-white" type="submit">
          Add Company
        </Button>
      </form>
    </Form>
  )
}

export default CompanyForm
