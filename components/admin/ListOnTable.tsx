import React from 'react'

interface Props {
  title: string
  list: Book[]
  containerClassName?: string
}

const ListOnTable = ({list}: Props) => {
  return (
    {list.map((list) => (
          <BookCard key={book.title} {...book} />
    ))}
  )
}

export default ListOnTable