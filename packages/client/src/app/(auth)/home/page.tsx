'use client'
import { Button } from "@/components/ui/button"
import Recents from "./recents"

const Home = () => {
  return (
    <section className="min-h-[100vh] p-5 space-y-5">
      <h2>Good Morning</h2>
      <Recents />
    </section>
  )
}

export default Home