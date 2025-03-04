import React from "react"
import { TableCell } from "./ui/table"

const List = () => {
  return (
    <>
      <TableCell className="font-medium"></TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </>
  )
}

export default List
