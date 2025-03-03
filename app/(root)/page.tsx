import { auth } from "@/auth"
import BookList from "@/components/BookList"
import BookOverview from "@/components/BookOverview"
import { Button } from "@/components/ui/button"
import { db } from "@/database/drizzle"
import { books, users } from "@/database/schema"
import { Book } from "@/types"
import { desc } from "drizzle-orm"

const Home = async () => {
  const session = await auth()

  const lastestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[]

  return (
    <>
      <BookOverview {...lastestBooks[0]} />
      <BookList
        title="Latest Books"
        books={lastestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  )
}

export default Home
