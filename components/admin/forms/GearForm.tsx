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
import { createGear } from "@/lib/admin/actions/gears/createGear"
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
import FileUpload from "@/components/FileUpload"
import { Separator } from "@/components/ui/separator"

interface Props extends Partial<Gear> {
  type?: "create" | "update"
}

const GearForm = ({ type, ...gear }: Props) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof gearSchema>>({
    resolver: zodResolver(gearSchema),
    defaultValues: {
      name: "",
      brand: "",
      model: "",

      type: undefined,
      status: undefined,

      purchaseDate: new Date(),
      purchaseValue: "",

      serialNumber: "",
      coverUrl: "",
      notes: "",
      companyId: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof gearSchema>) => {
    const result = await createGear(values)

    if (result.success) {
      toast({
        title: "Success",
        description: "Gear created successfully",
      })

      router.push(`/admin/gears`)
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
                  Nome do equipamento
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Informe o nome do equipamento"
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
            name={"brand"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 ">
                <FormLabel className="text-base font-normal text-dark-500">
                  Marca do equipamento
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Informe a marca do equipamento"
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
            name={"model"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 ">
                <FormLabel className="text-base font-normal text-dark-500">
                  Modelo do equipamento
                </FormLabel>
                <FormControl>
                  <Input
                    className="book-form_input"
                    placeholder="Informe o modelo do equipamento"
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
            name={"type"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Tipo do equipamento
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="book-form_input">
                    <SelectTrigger>
                      <SelectValue
                        className="text-base font-normal text-dark-500"
                        placeholder="Selecione o tipo do equipamento"
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
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name={"status"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Status do equipamento
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="book-form_input">
                    <SelectTrigger>
                      <SelectValue
                        className="text-base font-normal text-dark-500"
                        placeholder="Seleciona o status do equipamento"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      className="text-base font-normal text-dark-500"
                      value={"AVAILABLE"}
                    >
                      Disponível
                    </SelectItem>
                    <SelectItem
                      className="text-base font-normal text-dark-500"
                      value={"IN_USE"}
                    >
                      Em Uso
                    </SelectItem>
                    <SelectItem
                      className="text-base font-normal text-dark-500"
                      value={"UNDER_MAINTENANCE"}
                    >
                      Em Manutenção
                    </SelectItem>
                    <SelectItem
                      className="text-base font-normal text-dark-500"
                      value={"TO_BUY"}
                    >
                      Comprar
                    </SelectItem>
                    <SelectItem
                      className="text-base font-normal text-dark-500"
                      value={"INACTIVE"}
                    >
                      Inativo
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <h1 className="text-xl mt-6 mb-1 font-semibold text-dark-500">
            Informações de aquisição
          </h1>
          <Separator />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="purchaseDate"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Data de aquisição do equipamento
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "book-form_input justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span className="text-base font-normal">
                            Escolha a data de aquisição do equipamento
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(selectedDate) => {
                          field.onChange(selectedDate) // Atualiza o formulário
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name={"purchaseValue"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Valor de compra do equipamento
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Informe o valor de compra do equipamento"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
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
                    placeholder="Informe o Serial Number do equipamento"
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
            Outros
          </h1>
          <Separator />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name={"companyId"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Empresa que será inserido
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="book-form_input">
                    <SelectTrigger>
                      <SelectValue
                        className="text-base font-normal text-dark-500"
                        placeholder="Empresa que será inserido"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      className="text-base font-normal text-dark-500"
                      value={"04caaa02-ce7f-440b-ac62-ae7fef5aeb52"}
                    >
                      Busque Seu Corretor
                    </SelectItem>
                    <SelectItem
                      className="text-base font-normal text-dark-500"
                      value={"8c678b28-88e2-4377-b80e-6f4fffdfa726"}
                    >
                      Elevate Films
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name={"coverUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Imagem do equipamento
                </FormLabel>
                <FormControl>
                  <FileUpload
                    type="image"
                    accept="image/*"
                    placeholder="Faça o envio de uma imagem"
                    folder="gear/covers"
                    variant="light"
                    onFileChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          Add Gear
        </Button>
      </form>
    </Form>
  )
}

export default GearForm
