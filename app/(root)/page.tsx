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

  return (
    <>
      <h1 className="text-white font-bold text-3xl">Coming Soon</h1>
    </>
  )
}

export default Home
