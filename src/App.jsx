import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ExamTimer from './components/ExamTimer'
import PracticeTimer from './components/PracticeTimer'
import PomodoroTimer from './components/PomodoroTimer'
import FullScreenTimer from './components/FullScreenTimer'

function App() {
  const [fullScreenTimer, setFullScreenTimer] = useState(null)
  const [timerStates, setTimerStates] = useState({
    exam: { isRunning: false, displayTime: '02:30:00', timeLeft: null },
    practice: { isRunning: false, displayTime: '01:45:00', timeLeft: null },
    pomodoro: { isRunning: false, displayTime: '25:00', timeLeft: null }
  })

  const handleStartFullScreen = (timerData) => {
    setFullScreenTimer(timerData)
    setTimerStates(prev => ({
      ...prev,
      [timerData.type]: {
        ...prev[timerData.type],
        isRunning: true
      }
    }))
  }

  const handleCloseFullScreen = () => {
    setFullScreenTimer(null)
  }

  const handleUpdateTimer = (type, updates) => {
    setTimerStates(prev => ({
      ...prev,
      [type]: { ...prev[type], ...updates }
    }))

    if (fullScreenTimer && fullScreenTimer.type === type) {
      setFullScreenTimer(prev => ({
        ...prev,
        ...updates
      }))
    }
  }

  const handlePause = () => {
    if (fullScreenTimer) {
      handleUpdateTimer(fullScreenTimer.type, { isRunning: false })
    }
  }

  const handleResume = () => {
    if (fullScreenTimer) {
      handleUpdateTimer(fullScreenTimer.type, { isRunning: true })
    }
  }

  const handleReset = () => {
    if (fullScreenTimer) {
      handleUpdateTimer(fullScreenTimer.type, { isRunning: false, timeLeft: null })
      setFullScreenTimer(null)
    }
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex h-full grow flex-col">
          <div className="flex flex-1 items-start justify-center px-4 py-5 sm:px-6 lg:px-8">
            <div className="layout-content-container grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <ExamTimer 
                onStartFullScreen={handleStartFullScreen}
                onUpdateTimer={(updates) => handleUpdateTimer('exam', updates)}
                isRunning={timerStates.exam.isRunning}
              />
              <PracticeTimer 
                onStartFullScreen={handleStartFullScreen}
                onUpdateTimer={(updates) => handleUpdateTimer('practice', updates)}
                isRunning={timerStates.practice.isRunning}
              />
              <PomodoroTimer 
                onStartFullScreen={handleStartFullScreen}
                onUpdateTimer={(updates) => handleUpdateTimer('pomodoro', updates)}
                isRunning={timerStates.pomodoro.isRunning}
              />
            </div>
          </div>
        </main>
      </div>

      {fullScreenTimer && (
        <FullScreenTimer
          timer={{
            ...fullScreenTimer,
            displayTime: timerStates[fullScreenTimer.type]?.displayTime || fullScreenTimer.displayTime
          }}
          onClose={handleCloseFullScreen}
          onPause={handlePause}
          onResume={handleResume}
          onReset={handleReset}
          isRunning={timerStates[fullScreenTimer.type]?.isRunning || false}
        />
      )}
    </div>
  )
}

export default App
