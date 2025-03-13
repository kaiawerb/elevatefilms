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
      companyId: "",
      age: 0,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"fullname"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Full Name"
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
                E-mail
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="E-mail"
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
          name={"cpf"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                CPF
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="CPF"
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
                Phone
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Phone"
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
                Address
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Address"
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
          name={"age"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Age
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="book-form_input"
                  placeholder="Age"
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
          name={"genre"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">
                Type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="book-form_input">
                  <SelectTrigger>
                    <SelectValue
                      className="text-base font-normal text-dark-500"
                      placeholder="Select a type to display"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem
                    className="text-base font-normal text-dark-500"
                    value={"Man"}
                  >
                    Man
                  </SelectItem>
                  <SelectItem
                    className="text-base font-normal text-dark-500"
                    value={"Woman"}
                  >
                    Woman
                  </SelectItem>
                  <SelectItem
                    className="text-base font-normal text-dark-500"
                    value={"Undefined"}
                  >
                    Undefined
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="book-form_btn text-white" type="submit">
          Add Book to Library
        </Button>
      </form>
    </Form>
  )
}

export default UserForm
