'use client'

import React, { useEffect, useState } from 'react'

interface TimerProps {
    startTime: Date
    duration: number // seconds
    onTimeUp: () => void
}

export default function ExamTimer({ startTime, duration, onTimeUp }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration)

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const start = new Date(startTime)
            const elapsedSeconds = Math.floor((now.getTime() - start.getTime()) / 1000)
            const remaining = duration - elapsedSeconds

            if (remaining <= 0) {
                setTimeLeft(0)
                clearInterval(interval)
                onTimeUp()
            } else {
                setTimeLeft(remaining)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [startTime, duration, onTimeUp])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
        <div className={`text-2xl font-mono font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-foreground'}`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
    )
}
