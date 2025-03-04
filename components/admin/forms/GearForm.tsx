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
import { Gear } from "@/types"
import { gearSchema } from "@/lib/validations"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { toast } from "@/hooks/use-toast"
import { createGear } from "@/lib/admin/actions/gear"
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

interface Props extends Partial<Gear> {
  type?: "create" | "update"
}

const GearForm = ({ type, ...gear }: Props) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof gearSchema>>({
    resolver: zodResolver(gearSchema),
    defaultValues: {
      name: "",
      type: undefined,
      brand: "",
      model: "",
      serialNumber: "",
      purchaseDate: new Date(),
      purchaseValue: "",
      status: undefined,
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

      //router.push(`/admins/books/${result.data.id}`)
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
                Gear Title
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Gear Title"
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
          name={"type"}
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
                      placeholder="Select a verified email to display"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem
                    className="text-base font-normal text-dark-500"
                    value={"DRONE"}
                  >
                    Drone
                  </SelectItem>
                  <SelectItem
                    className="text-base font-normal text-dark-500"
                    value={"CAMERA"}
                  >
                    Camera
                  </SelectItem>
                  <SelectItem
                    className="text-base font-normal text-dark-500"
                    value={"LENS"}
                  >
                    Lens
                  </SelectItem>
                  <SelectItem
                    className="text-base font-normal text-dark-500"
                    value={"ACCESSORY"}
                  >
                    Accessory
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"brand"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Brand
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Brand"
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
          name={"model"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Model
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Model"
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
          name={"serialNumber"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Serial Number
              </FormLabel>
              <FormControl>
                <Input
                  className="book-form_input"
                  placeholder="Serial Number"
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
          name={"purchaseDate"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 ">
              <FormLabel className="text-base font-normal text-dark-500">
                Purchase Date
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "book-form_input justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span className="text-base font-normal">
                          Pick a date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"purchaseValue"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Purchase Value
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Purchase Value"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"status"}
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
                      placeholder="Select a verified email to display"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem
                    className="text-base font-normal text-dark-500"
                    value={"AVAILABLE"}
                  >
                    Available
                  </SelectItem>
                  <SelectItem
                    className="text-base font-normal text-dark-500"
                    value={"IN_USE"}
                  >
                    In Use
                  </SelectItem>
                  <SelectItem
                    className="text-base font-normal text-dark-500"
                    value={"UNDER_MAINTENANCE"}
                  >
                    Under Maintenance
                  </SelectItem>
                  <SelectItem
                    className="text-base font-normal text-dark-500"
                    value={"INACTIVE"}
                  >
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"notes"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Notes
              </FormLabel>
              <FormControl>
                <Textarea
                  className="book-form_input"
                  placeholder="Notes"
                  {...field}
                  rows={5}
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
