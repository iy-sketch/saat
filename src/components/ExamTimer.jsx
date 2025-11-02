import React, { useState, useEffect, useRef } from 'react'

function ExamTimer({ onStartFullScreen, onUpdateTimer, isRunning: externalIsRunning }) {
  const [hours, setHours] = useState(2)
  const [minutes, setMinutes] = useState(30)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [displayTime, setDisplayTime] = useState('02:30:00')
  const intervalRef = useRef(null)

  useEffect(() => {
    if (externalIsRunning !== undefined) {
      setIsRunning(externalIsRunning)
    }
  }, [externalIsRunning])

  useEffect(() => {
    if (isRunning && timeLeft !== null) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            setIsRunning(false)
            if (onUpdateTimer) onUpdateTimer({ isRunning: false })
            handleAlarm()
            return 0
          }
          const newTime = prev - 1
          // Zamanı güncelle
          const h = Math.floor(newTime / 3600)
          const m = Math.floor((newTime % 3600) / 60)
          const s = newTime % 60
          const newDisplayTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
          setDisplayTime(newDisplayTime)
          if (onUpdateTimer) {
            onUpdateTimer({ 
              timeLeft: newTime, 
              displayTime: newDisplayTime 
            })
          }
          return newTime
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft, onUpdateTimer])

  useEffect(() => {
    if (timeLeft !== null) {
      const h = Math.floor(timeLeft / 3600)
      const m = Math.floor((timeLeft % 3600) / 60)
      const s = timeLeft % 60
      setDisplayTime(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`)
    }
  }, [timeLeft])

  const handleStart = () => {
    if (!isRunning) {
      const totalSeconds = hours * 3600 + minutes * 60
      if (totalSeconds > 0) {
        setTimeLeft(totalSeconds)
        setIsRunning(true)
        
        // Tam ekran aç
        const h = Math.floor(totalSeconds / 3600)
        const m = Math.floor((totalSeconds % 3600) / 60)
        const s = totalSeconds % 60
        const initialDisplayTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
        
        if (onStartFullScreen) {
          onStartFullScreen({
            type: 'exam',
            displayTime: initialDisplayTime,
            timeLeft: totalSeconds,
            isRunning: true
          })
        }
        
        if (onUpdateTimer) {
          onUpdateTimer({ 
            isRunning: true, 
            timeLeft: totalSeconds,
            displayTime: initialDisplayTime
          })
        }
      }
    } else {
      setIsRunning(false)
      if (onUpdateTimer) onUpdateTimer({ isRunning: false })
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(null)
    setDisplayTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`)
  }

  const handleAlarm = () => {
    // Ses çal
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 2)

    // Bildirim
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Sınav Süresi Doldu!', {
        body: 'Sınav süreniz tamamlandı.',
        icon: '/icon.png'
      })
    } else if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-[#18232f] p-6 @container">
      <div className="flex flex-col items-stretch justify-start">
        <div className="flex w-full grow flex-col items-stretch justify-center gap-2">
          <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
            Sınav Çalar Saati
          </h2>
          <p className="text-[#9cabba] text-base font-normal leading-normal">
            Sınav süresini ayarlayın ve geri sayımı başlatın.
          </p>
        </div>
      </div>
      
      {isRunning && timeLeft !== null ? (
        <div className="flex w-full flex-col mt-6">
          <div className="my-6 flex flex-col items-center justify-center rounded-lg bg-black/20 py-8">
            <span className="text-6xl font-bold tracking-tighter text-primary md:text-8xl">
              {displayTime}
            </span>
          </div>
          <div className="flex justify-stretch pt-2">
            <div className="flex flex-1 flex-wrap gap-3 justify-start">
              <button
                onClick={handleStart}
                className="flex min-w-[84px] flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white h-12"
              >
                <span className="material-symbols-outlined">pause</span>
                <span className="truncate">Duraklat</span>
              </button>
              <button
                onClick={handleReset}
                className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#283039] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white h-12"
              >
                <span className="material-symbols-outlined">restart_alt</span>
                <span className="truncate">Sıfırla</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col mt-6">
          <div className="flex w-full flex-wrap items-end gap-4 pb-4">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Saat</p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#3b4754] bg-[#1b2127] p-[15px] text-base font-normal leading-normal text-white placeholder:text-[#9cabba] focus:border-primary focus:outline-0 focus:ring-0 h-14"
                placeholder="02"
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0
                  if (val >= 0 && val <= 23) setHours(val)
                }}
                disabled={isRunning}
              />
            </label>
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Dakika</p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#3b4754] bg-[#1b2127] p-[15px] text-base font-normal leading-normal text-white placeholder:text-[#9cabba] focus:border-primary focus:outline-0 focus:ring-0 h-14"
                placeholder="30"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0
                  if (val >= 0 && val <= 59) setMinutes(val)
                }}
                disabled={isRunning}
              />
            </label>
          </div>
          <div className="flex justify-stretch pt-2">
            <div className="flex flex-1 flex-wrap gap-3 justify-start">
              <button
                onClick={handleStart}
                className="flex min-w-[84px] flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white h-12"
              >
                <span className="material-symbols-outlined">play_arrow</span>
                <span className="truncate">Sınavı Başlat</span>
              </button>
              <button
                onClick={handleReset}
                className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#283039] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white h-12"
              >
                <span className="material-symbols-outlined">restart_alt</span>
                <span className="truncate">Sıfırla</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExamTimer

