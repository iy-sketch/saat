import React, { useEffect, useState } from 'react'

function FullScreenTimer({ timer, onClose, onPause, onResume, onReset, isRunning }) {
  const [displayTime, setDisplayTime] = useState(timer?.displayTime || '00:00:00')

  useEffect(() => {
    if (timer) {
      setDisplayTime(timer.displayTime)
    }
  }, [timer])

  if (!timer) return null

  const getTimerColor = () => {
    if (timer.type === 'exam') return 'text-primary'
    if (timer.type === 'practice') return 'text-[#48D1CC]'
    if (timer.type === 'pomodoro') return 'text-[#ff6b6b]'
    return 'text-white'
  }

  const getTimerTitle = () => {
    if (timer.type === 'exam') return 'Sınav Çalar Saati'
    if (timer.type === 'practice') {
      return `${timer.practiceType === 'numerical' ? 'Sayısal' : 'Sözel'} Deneme Çalar Saati`
    }
    if (timer.type === 'pomodoro') {
      const typeNames = {
        pomodoro: 'Pomodoro',
        short: 'Kısa Mola',
        long: 'Uzun Mola'
      }
      return typeNames[timer.timerType] || 'Ders Çalışma'
    }
    return 'Çalar Saat'
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full px-4">
        <div className="flex flex-col items-center justify-center mb-6 md:mb-8">
          <h2 className="text-white/60 text-base md:text-xl font-medium mb-4 md:mb-6 text-center">
            {getTimerTitle()}
          </h2>
          <div className={`text-[8rem] sm:text-[12rem] md:text-[15rem] lg:text-[20rem] font-bold tracking-tighter ${getTimerColor()} leading-none`}>
            {displayTime}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <button
            onClick={isRunning ? onPause : onResume}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-lg font-medium transition-colors"
          >
            <span className="material-symbols-outlined">
              {isRunning ? 'pause' : 'play_arrow'}
            </span>
            <span>{isRunning ? 'Duraklat' : 'Devam Et'}</span>
          </button>
          
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-lg font-medium transition-colors"
          >
            <span className="material-symbols-outlined">restart_alt</span>
            <span>Sıfırla</span>
          </button>
          
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-lg font-medium transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
            <span>Ana Menü</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FullScreenTimer

