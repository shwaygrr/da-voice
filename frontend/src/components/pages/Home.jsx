"use client"

import { useLocation } from "@/contexts/location"

const Home = () => {
  const { location, error } = useLocation()
  const { lng, lat } = location

  return (
      <div>
        <nav className="h-24 w-full bg-green-100">
          <ul>
            <li>{lng}, {lat}</li>
            <li>Route 1</li>
            <li>Route 2</li>
          </ul>
        </nav>
      </div>
  )
}

export default Home