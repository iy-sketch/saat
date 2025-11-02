import React, { useState, useEffect, useRef } from 'react'

function PomodoroTimer({ onStartFullScreen, onUpdateTimer, isRunning: externalIsRunning }) {
  const [timerType, setTimerType] = useState('pomodoro') // 'pomodoro', 'short', 'long'
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 dakika saniye cinsinden
  const [isRunning, setIsRunning] = useState(false)
  const [session, setSession] = useState(1)
  const [displayTime, setDisplayTime] = useState('25:00')
  const intervalRef = useRef(null)

  const timerPresets = {
    pomodoro: 25 * 60, // 25 dakika
    short: 5 * 60, // 5 dakika
    long: 15 * 60 // 15 dakika
  }

  useEffect(() => {
    setTimeLeft(timerPresets[timerType])
    setIsRunning(false)
  }, [timerType])

  useEffect(() => {
    if (externalIsRunning !== undefined) {
      setIsRunning(externalIsRunning)
    }
  }, [externalIsRunning])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            setIsRunning(false)
            if (onUpdateTimer) onUpdateTimer({ isRunning: false })
            handleComplete()
            return 0
          }
          const newTime = prev - 1
          // Zamanı güncelle
          const m = Math.floor(newTime / 60)
          const s = newTime % 60
          const newDisplayTime = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
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
    const m = Math.floor(timeLeft / 60)
    const s = timeLeft % 60
    setDisplayTime(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`)
  }, [timeLeft])

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true)
      
      // Tam ekran aç
      const m = Math.floor(timeLeft / 60)
      const s = timeLeft % 60
      const initialDisplayTime = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      
      if (onStartFullScreen) {
        onStartFullScreen({
          type: 'pomodoro',
          timerType: timerType,
          displayTime: initialDisplayTime,
          timeLeft: timeLeft,
          isRunning: true,
          session: session
        })
      }
      
      if (onUpdateTimer) {
        onUpdateTimer({ 
          isRunning: true, 
          timeLeft: timeLeft,
          displayTime: initialDisplayTime
        })
      }
    } else {
      setIsRunning(false)
      if (onUpdateTimer) onUpdateTimer({ isRunning: false })
    }
  }

  const handleSkip = () => {
    setIsRunning(false)
    if (timerType === 'pomodoro') {
      // Pomodoro tamamlandı, kısa mola başlat
      setTimerType('short')
      setSession(prev => prev + 1)
    } else {
      // Mola tamamlandı, pomodoro başlat
      setTimerType('pomodoro')
    }
  }

  const handleComplete = () => {
    // Ses çal
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 600
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 1.5)

    // Bildirim
    if ('Notification' in window && Notification.permission === 'granted') {
      let message = ''
      if (timerType === 'pomodoro') {
        message = 'Pomodoro seansı tamamlandı! Kısa mola zamanı.'
      } else if (timerType === 'short') {
        message = 'Kısa mola tamamlandı! Tekrar çalışmaya başlayabilirsiniz.'
      } else {
        message = 'Uzun mola tamamlandı! Tekrar çalışmaya başlayabilirsiniz.'
      }
      
      new Notification('Seans Tamamlandı', {
        body: message,
        icon: '/icon.png'
      })
    } else if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    // Otomatik geçiş
    if (timerType === 'pomodoro') {
      if (session % 4 === 0) {
        setTimerType('long')
      } else {
        setTimerType('short')
      }
    } else {
      setTimerType('pomodoro')
      if (timerType === 'short' || timerType === 'long') {
        setSession(prev => prev + 1)
      }
    }
  }

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  const getCurrentSessions = () => {
    if (timerType === 'pomodoro') {
      return Math.ceil(session / 2)
    }
    return Math.ceil((session - 1) / 2)
  }

  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-[#18232f] p-6 @container md:col-span-2 lg:col-span-1">
      <div className="flex flex-col items-stretch justify-start">
        <div className="flex w-full grow flex-col items-stretch justify-center gap-2">
          <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
            Ders Çalışma Bölümü
          </h2>
          <p className="text-[#9cabba] text-base font-normal leading-normal">
            Pomodoro tekniği ile odaklanarak çalışın.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col mt-6">
        <div className="grid w-full grid-cols-3 gap-3 rounded-lg bg-[#283039] p-1.5">
          <button
            onClick={() => setTimerType('pomodoro')}
            className={`flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md px-4 text-sm font-bold leading-normal tracking-[0.015em] h-11 transition-colors ${
              timerType === 'pomodoro'
                ? 'bg-[#ff6b6b] text-background-dark'
                : 'text-white/60 hover:bg-white/5'
            }`}
          >
            <span className="truncate">Pomodoro</span>
          </button>
          <button
            onClick={() => setTimerType('short')}
            className={`flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md px-4 text-sm font-medium leading-normal tracking-[0.015em] h-11 transition-colors ${
              timerType === 'short'
                ? 'bg-[#ff6b6b] text-background-dark'
                : 'text-white/60 hover:bg-white/5'
            }`}
          >
            <span className="truncate">Kısa Mola</span>
          </button>
          <button
            onClick={() => setTimerType('long')}
            className={`flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md px-4 text-sm font-medium leading-normal tracking-[0.015em] h-11 transition-colors ${
              timerType === 'long'
                ? 'bg-[#ff6b6b] text-background-dark'
                : 'text-white/60 hover:bg-white/5'
            }`}
          >
            <span className="truncate">Uzun Mola</span>
          </button>
        </div>
        <div className="my-6 flex flex-col items-center justify-center rounded-lg bg-black/20 py-8">
          <span className="text-6xl font-bold tracking-tighter text-[#ff6b6b] md:text-8xl">
            {displayTime}
          </span>
          <div className="mt-4 flex items-center gap-2 text-[#9cabba]">
            <span className="material-symbols-outlined text-base">local_fire_department</span>
            <span className="text-sm font-medium">Seans: {getCurrentSessions()}/4</span>
          </div>
        </div>
        <div className="flex justify-stretch pt-2">
          <div className="flex flex-1 flex-wrap gap-3 justify-start">
            <button
              onClick={handleStart}
              className="flex min-w-[84px] flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#ff6b6b] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-background-dark h-12"
            >
              <span className="material-symbols-outlined">
                {isRunning ? 'pause' : 'play_arrow'}
              </span>
              <span className="truncate">{isRunning ? 'Duraklat' : 'Başlat'}</span>
            </button>
            <button
              onClick={handleSkip}
              className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#283039] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white h-12"
            >
              <span className="material-symbols-outlined">skip_next</span>
              <span className="truncate">Atla</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PomodoroTimer

