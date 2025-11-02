import React, { useState, useEffect } from 'react'

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now)
      
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Europe/Istanbul'
      }
      setCurrentDate(now.toLocaleDateString('tr-TR', options))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-7xl items-start justify-end px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end">
          <h1 className="text-white tracking-light text-5xl font-bold leading-tight text-right md:text-7xl">
            {formatTime(currentTime)}
          </h1>
          <p className="text-[#9cabba] text-base font-normal leading-normal pt-2">
            {currentDate} - İstanbul, TR
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header

