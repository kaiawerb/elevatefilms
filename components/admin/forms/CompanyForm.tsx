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
import { Separator } from "@/components/ui/separator"

interface Props extends Partial<Company> {
  type?: "create" | "update"
}

const CompanyForm = ({ type, ...gear }: Props) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      email: "",

      phone: "",
      cnpj: "",

      street: "",
      city: "",
      neighborhood: "",
      state: "",
      zipCode: "",
      complement: "",

      notes: "",
      image: "",
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap gap-4"
      >
        <div className="w-full">
          <h1 className="text-xl mt-6 mb-1 font-semibold text-dark-500">
            Informações básicas
          </h1>
          <Separator />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 ">
                <FormLabel className="text-base font-normal text-dark-500">
                  Nome da Empresa
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Informe o nome da empresa"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name={"cnpj"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 ">
                <FormLabel className="text-base font-normal text-dark-500">
                  CNPJ
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Informe o CNPJ da empresa"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <h1 className="text-xl mt-6 mb-1 font-semibold text-dark-500">
            Contato
          </h1>
          <Separator />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name={"phone"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 ">
                <FormLabel className="text-base font-normal text-dark-500">
                  Telefone da empresa
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Informe o telefone da empresa."
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 ">
                <FormLabel className="text-base font-normal text-dark-500">
                  E-mail da empresa
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Informe o e-mail da empresa."
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <h1 className="text-xl mt-6 mb-1 font-semibold text-dark-500">
            Endereço
          </h1>
          <Separator />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Endereço
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Endereço"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Cidade
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Cidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Bairro
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Bairro"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Estado
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Estado"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  CEP
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="CEP"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Complemento
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Complemento"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <h1 className="text-xl mt-6 mb-1 font-semibold text-dark-500">
            Outros
          </h1>
          <Separator />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Notas
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="book-form_input"
                    placeholder="Notas"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="book-form_btn text-white" type="submit">
          Add Company
        </Button>
      </form>
    </Form>
  )
}

export default CompanyForm
