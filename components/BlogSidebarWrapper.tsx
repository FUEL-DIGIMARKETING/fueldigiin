'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  left: React.ReactNode
  right: React.ReactNode
  children: React.ReactNode
}

export default function BlogSidebarWrapper({ left, right, children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [sidebarLeft, setSidebarLeft] = useState(0)
  const [sidebarRight, setSidebarRight] = useState(0)
  const [ready, setReady] = useState(false)
  const [isFixed, setIsFixed] = useState(true)
  const [absoluteTop, setAbsoluteTop] = useState(0)

  const SIDEBAR_W = 240
  const GAP = 24
  const TOP = 100

  useEffect(() => {
    const calcPositions = () => {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      setSidebarLeft(rect.left + window.scrollX)
      setSidebarRight(window.innerWidth - rect.right + window.scrollX)
      setReady(true)
    }

    const onScroll = () => {
      if (!wrapperRef.current) return

      const footer = document.querySelector('footer')
      if (!footer) return

      const footerTop = footer.getBoundingClientRect().top
      const sidebarH = window.innerHeight - TOP - 20

      // When footer top is within viewport and would overlap sidebar bottom
      if (footerTop < TOP + sidebarH) {
        // Switch to absolute — calculate how far from wrapper top the sidebar should sit
        const wrapperRect = wrapperRef.current.getBoundingClientRect()
        const wrapperScrollTop = wrapperRect.top + window.scrollY
        const footerScrollTop = footer.getBoundingClientRect().top + window.scrollY
        const newAbsoluteTop = footerScrollTop - wrapperScrollTop - sidebarH
        setAbsoluteTop(Math.max(0, newAbsoluteTop))
        setIsFixed(false)
      } else {
        setIsFixed(true)
      }
    }

    calcPositions()
    window.addEventListener('resize', calcPositions)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', calcPositions)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const sidebarStyle = (side: 'left' | 'right'): React.CSSProperties => {
    const maxH = `calc(100vh - ${TOP + 20}px)`
    if (isFixed) {
      return {
        position: 'fixed',
        top: TOP,
        [side]: side === 'left' ? sidebarLeft : sidebarRight,
        width: SIDEBAR_W,
        maxHeight: maxH,
        opacity: ready ? 1 : 0,
      }
    }
    return {
      position: 'absolute',
      top: absoluteTop,
      [side]: 0,
      width: SIDEBAR_W,
      maxHeight: maxH,
      opacity: ready ? 1 : 0,
    }
  }

  return (
    <div ref={wrapperRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">

      {/* Left sidebar */}
      <aside
        className="hidden lg:block overflow-y-auto space-y-4 z-10"
        style={sidebarStyle('left')}
      >
        {left}
      </aside>

      {/* Center content */}
      <div style={{
        marginLeft: ready ? SIDEBAR_W + GAP : 0,
        marginRight: ready ? SIDEBAR_W + GAP : 0,
      }}>
        {children}
      </div>

      {/* Right sidebar */}
      <aside
        className="hidden lg:block overflow-y-auto space-y-4 z-10"
        style={sidebarStyle('right')}
      >
        {right}
      </aside>

    </div>
  )
}
