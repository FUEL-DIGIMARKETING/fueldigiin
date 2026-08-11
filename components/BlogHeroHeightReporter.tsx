'use client'

import { useEffect } from 'react'

export default function BlogHeroHeightReporter() {
  useEffect(() => {
    const hero = document.getElementById('blog-hero')
    if (!hero) return
    hero.setAttribute('data-height', String(hero.offsetHeight))
  }, [])

  return null
}
