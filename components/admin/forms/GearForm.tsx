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
import { useRouter } from "next/navigation"
import { Book } from "@/types"
import { bookSchema, gearSchema } from "@/lib/validations"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { toast } from "@/hooks/use-toast"
import { createGear } from "@/lib/admin/actions/gear"

interface Props extends Partial<Book> {
  type?: "create" | "update"
}

const GearForm = ({ type, ...book }: Props) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof gearSchema>>({
    resolver: zodResolver(gearSchema),
    defaultValues: {
      name: "",
      type: "DRONE",
      brand: "",
      model: "",
      serialNumber: "",
      purchaseDate: new Date(),
      purchaseValue: 1,
      status: "AVAILABLE",
      notes: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof gearSchema>) => {
    const result = await createGear(values)

    if (result.success) {
      toast({
        title: "Success",
        description: "Book created successfully",
      })

      router.push(`/admins/books/${result.data.id}`)
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
          name={"name"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Book Title"
                  required
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="book-form_btn text-white" type="submit">
          Add Gear
        </Button>
      </form>
    </Form>
  )
}

export default GearForm
