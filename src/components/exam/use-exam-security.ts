'use client'

import { useEffect } from 'react'

export function useExamSecurity() {
    useEffect(() => {
        // 1. Disable Right Click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault()
        }

        // 2. Disable Copy/Paste
        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault()
        }
        const handlePaste = (e: ClipboardEvent) => {
            e.preventDefault()
        }
        const handleCut = (e: ClipboardEvent) => {
            e.preventDefault()
        }

        // 3. Tab Switching Detection
        const handleVisibilityChange = () => {
            if (document.hidden) {
                console.warn("User switched tabs! Log this event.")
                // In real app: Send server action to log suspicious activity
                alert("Warning: Tab switching is detected and monitored!")
            }
        }

        // 4. Disable certain keyboard shortcuts (like PrintScreen or Alt+Tab is hard to block but we can try basic ones)
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'x')) {
                e.preventDefault();
            }
        };


        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('copy', handleCopy)
        document.addEventListener('paste', handlePaste)
        document.addEventListener('cut', handleCut)
        document.addEventListener('visibilitychange', handleVisibilityChange)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('copy', handleCopy)
            document.removeEventListener('paste', handlePaste)
            document.removeEventListener('cut', handleCut)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])
}
