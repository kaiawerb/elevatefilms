"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { redirect, useRouter } from "next/navigation"
import { userSchema } from "@/lib/validations"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { User } from "next-auth"

import { toast } from "@/hooks/use-toast"
import { createUser } from "@/lib/admin/actions/user"
import { hash } from "bcryptjs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const generateRandomPassword = (length: number = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    password += chars[randomIndex]
  }
  return password
}

interface Props extends Partial<User> {
  type?: "create" | "update"
}

const UserForm = ({ type, ...user }: Props) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullname: "",
      email: "",

      genre: "",
      age: 0,

      civilStatus: "",
      profession: "",
      phone: "",

      cpf: "",
      rg: "",
      documentPhoto: "",
      creci: "",

      street: "",
      city: "",
      neighborhood: "",
      state: "",
      zipCode: "",
      complement: "",

      notes: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    // Gerar uma senha aleatória para o usuário
    const password = generateRandomPassword(10) // Aqui você gera uma senha aleatória com 10 caracteres
    const hashedPassword = await hash(password, 10) // Aqui você faz o hash da senha com bcryptjs

    // Atualizar o valor de password antes de enviar para criação do usuário
    const userData = {
      ...values,
      password: hashedPassword, // Substitui a senha com o valor hasheado
    }

    console.log(userData)

    const result = await createUser(userData)

    if (result.success) {
      toast({
        title: "Success",
        description: "User created successfully",
      })

      router.push(`/admins/users/${result.data.id}`)
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap gap-4"
      >
        <div className="w-full">
          <h1 className="text-xl mt-6 mb-1 font-semibold text-dark-500">
            Dados pessoais
          </h1>
          <hr className="mb-4 " />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Nome Completo
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Nome completo"
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
            name="age"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Idade
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    type="number"
                    placeholder="Idade"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
            name="genre"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Gênero
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger className="book-form_input">
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name="civilStatus"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Estado Civil
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Estado Civil"
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
            name="profession"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Profissão
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Profissão"
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
            Documentos
          </h1>
          <hr className="mb-4 " />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  CPF
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="CPF"
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
            name="rg"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  RG
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="RG"
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
            name="documentPhoto"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Foto Documento
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Foto Documento"
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
            name="creci"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  CRECI
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="CRECI"
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
          <hr className="mb-4 " />
        </div>

        <div className="w-[calc(50%-0.5rem)]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  E-mail
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="johndoe@example.com"
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
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Telefone
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Telefone"
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
          <hr className="mb-4 " />
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
          <hr className="mb-4 " />
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
          Add User
        </Button>
      </form>
    </Form>
  )
}

export default UserForm
