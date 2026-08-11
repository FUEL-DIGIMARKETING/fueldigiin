'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  right: React.ReactNode
  children: React.ReactNode
}

export default function BlogTwoColumnWrapper({ right, children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({})
  const [mainMargin, setMainMargin] = useState(0)
  const [mounted, setMounted] = useState(false)

  const SIDEBAR_W = 320
  const GAP = 32
  const STICKY_TOP = 24
  const FOOTER_GAP = 24

  useEffect(() => {
    setMounted(true)

    const update = () => {
      if (!wrapperRef.current || !sidebarRef.current) return

      const isLg = window.innerWidth >= 1024

      if (!isLg) {
        setMainMargin(0)
        setSidebarStyle({})
        return
      }

      setMainMargin(SIDEBAR_W + GAP)

      const wrapperRect = wrapperRef.current.getBoundingClientRect()
      const footer = document.querySelector('footer')
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity
      const sidebarH = sidebarRef.current.offsetHeight
      const rightOffset = window.innerWidth - wrapperRect.right

      if (wrapperRect.top > STICKY_TOP) {
        setSidebarStyle({ position: 'absolute', top: 0, right: 0, width: SIDEBAR_W, opacity: 1 })
        return
      }

      const sidebarBottomInViewport = STICKY_TOP + sidebarH
      if (footerTop <= sidebarBottomInViewport + FOOTER_GAP) {
        const footerScrollTop = (footer as HTMLElement).getBoundingClientRect().top + window.scrollY
        const wrapperScrollTop = wrapperRect.top + window.scrollY
        const absTop = footerScrollTop - wrapperScrollTop - sidebarH - FOOTER_GAP
        setSidebarStyle({ position: 'absolute', top: Math.max(0, absTop), right: 0, width: SIDEBAR_W, opacity: 1 })
        return
      }

      setSidebarStyle({ position: 'fixed', top: STICKY_TOP, right: rightOffset, width: SIDEBAR_W, opacity: 1 })
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [])

  // Before JS hydrates, render mobile-safe layout (no marginRight, no aside)
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>{children}</div>
        <div className="mt-6 space-y-4">{right}</div>
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Main content — full width on mobile, sidebar-offset on desktop */}
      <div style={{ marginRight: mainMargin }}>
        {children}
      </div>

      {/* Mobile: sidebar content stacked below */}
      <div className="lg:hidden mt-6 space-y-4">
        {right}
      </div>

      {/* Desktop sticky sidebar */}
      <aside
        ref={sidebarRef}
        className="hidden lg:block z-20"
        style={{ ...sidebarStyle, scrollbarWidth: 'none' }}
      >
        <div className="space-y-4 pb-2">
          {right}
        </div>
      </aside>
    </div>
  )
}
