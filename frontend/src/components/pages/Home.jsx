"use client"

import { useLocation } from "@/contexts/location"
import Navbar from "../Navbar"

const Home = () => {
  const { location, error } = useLocation()
  const { lng, lat } = location

  return (
      <div>
        <Navbar />
      </div>
  )
}

export default Home