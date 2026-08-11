'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load GSAP scripts
    const loadScripts = async () => {
      if (typeof window !== 'undefined' && !window.gsap) {
        const gsapScript = document.createElement('script')
        gsapScript.src = 'https://unpkg.co/gsap@3/dist/gsap.min.js'
        document.head.appendChild(gsapScript)

        const draggableScript = document.createElement('script')
        draggableScript.src = 'https://unpkg.com/gsap@3/dist/Draggable.min.js'
        document.head.appendChild(draggableScript)

        const morphScript = document.createElement('script')
        morphScript.src = 'https://assets.codepen.io/16327/MorphSVGPlugin3.min.js'
        document.head.appendChild(morphScript)

        gsapScript.onload = () => {
          setTimeout(initLampAnimation, 100)
        }
      } else if (window.gsap) {
        initLampAnimation()
      }
    }

    loadScripts()
  }, [])

  const initLampAnimation = () => {
    if (!window.gsap) return

    const { gsap, MorphSVGPlugin, Draggable } = window
    gsap.registerPlugin(MorphSVGPlugin)

    const LOGIN_FORM = document.querySelector('.login-form') as HTMLElement
    const CORDS = gsap.utils.toArray('.cords path') as any[]
    const HIT = document.querySelector('.lamp__hit') as HTMLElement
    const DUMMY_CORD = document.querySelector('.cord--dummy') as SVGLineElement

    if (!LOGIN_FORM || !HIT || !DUMMY_CORD) return

    const ENDX = DUMMY_CORD.getAttribute('x2') || '124'
    const ENDY = DUMMY_CORD.getAttribute('y2') || '348'
    const PROXY = document.createElement('div')

    let startX: number, startY: number
    let STATE = { ON: false }

    const RESET = () => {
      gsap.set(PROXY, { x: ENDX, y: ENDY })
    }
    RESET()

    gsap.set(['.cords', HIT], { x: -10 })
    gsap.set('.lamp__eye', {
      rotate: 180,
      transformOrigin: '50% 50%',
      yPercent: 50
    })

    const CORD_TL = gsap.timeline({
      paused: true,
      onStart: () => {
        STATE.ON = !STATE.ON
        gsap.set(document.documentElement, { '--on': STATE.ON ? 1 : 0 })
        const hue = gsap.utils.random(0, 359)
        gsap.set(document.documentElement, { '--shade-hue': hue })

        const glowColor = `hsl(${hue}, 40%, 45%)`
        const glowColorDark = `hsl(${hue}, 40%, 35%)`
        gsap.set(document.documentElement, {
          '--glow-color': glowColor,
          '--glow-color-dark': glowColorDark
        })

        gsap.set('.lamp__eye', { rotate: STATE.ON ? 0 : 180 })
        gsap.set([DUMMY_CORD, HIT], { display: 'none' })
        gsap.set(CORDS[0], { display: 'block' })

        if (STATE.ON) {
          LOGIN_FORM.classList.add('active')
        } else {
          LOGIN_FORM.classList.remove('active')
        }
      },
      onComplete: () => {
        gsap.set([DUMMY_CORD, HIT], { display: 'block' })
        gsap.set(CORDS[0], { display: 'none' })
        RESET()
      }
    })

    for (let i = 1; i < CORDS.length; i++) {
      CORD_TL.add(
        gsap.to(CORDS[0], {
          morphSVG: CORDS[i],
          duration: 0.1,
          repeat: 1,
          yoyo: true
        })
      )
    }

    Draggable.create(PROXY, {
      trigger: HIT,
      type: 'x,y',
      onPress: (e: any) => {
        startX = e.x
        startY = e.y
      },
      onDrag: function (this: any) {
        gsap.set(DUMMY_CORD, {
          attr: {
            x2: this.x,
            y2: Math.max(400, this.y)
          }
        })
      },
      onRelease: function (this: any, e: any) {
        const DISTX = Math.abs(e.x - startX)
        const DISTY = Math.abs(e.y - startY)
        const TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY)
        gsap.to(DUMMY_CORD, {
          attr: { x2: ENDX, y2: ENDY },
          duration: 0.1,
          onComplete: () => {
            if (TRAVELLED > 50) {
              CORD_TL.restart()
            } else {
              RESET()
            }
          }
        })
      }
    })

    gsap.set('.lamp', { display: 'block' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Login successful!')
        window.location.replace('/admin-dashboard')
      } else {
        toast.error(data.error || 'Login failed')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --cord: hsl(210, 0%, calc((40 + (var(--on, 0) * 50)) * 1%));
          --opening: hsl(50, calc((10 + (var(--on, 0) * 80)) * 1%), calc((20 + (var(--on, 0) * 70)) * 1%));
          --feature: #0a0a0a;
          --accent: 210;
          --tongue: #e06952;
          --base-top: hsl(var(--accent), 0%, calc((40 + (var(--on, 0) * 40)) * 1%));
          --base-side: hsl(var(--accent), 0%, calc((20 + (var(--on, 0) * 40)) * 1%));
          --post: hsl(var(--accent), 0%, calc((20 + (var(--on, 0) * 40)) * 1%));
          --b-1: hsla(45, calc((0 + (var(--on, 0) * 0)) * 1%), calc((50 + (var(--on, 0) * 50)) * 1%), 0.85);
          --b-2: hsla(45, calc((0 + (var(--on, 0) * 0)) * 1%), calc((20 + (var(--on, 0) * 30)) * 1%), 0.25);
          --b-3: hsla(45, calc((0 + (var(--on, 0) * 0)) * 1%), calc((20 + (var(--on, 0) * 30)) * 1%), 0.5);
          --b-4: hsla(45, calc((0 + (var(--on, 0) * 0)) * 1%), calc((20 + (var(--on, 0) * 30)) * 1%), 0.25);
          --l-1: hsla(45, calc((0 + (var(--on, 0) * 20)) * 1%), calc((50 + (var(--on, 0) * 50)) * 1%), 0.85);
          --l-2: hsla(45, calc((0 + (var(--on, 0) * 20)) * 1%), calc((50 + (var(--on, 0) * 50)) * 1%), 0.85);
          --shade-hue: 320;
          --t-1: hsl(var(--shade-hue), calc((0 + (var(--on, 0) * 20)) * 1%), calc((30 + (var(--on, 0) * 60)) * 1%));
          --t-2: hsl(var(--shade-hue), calc((0 + (var(--on, 0) * 20)) * 1%), calc((20 + (var(--on, 0) * 35)) * 1%));
          --t-3: hsl(var(--shade-hue), calc((0 + (var(--on, 0) * 20)) * 1%), calc((10 + (var(--on, 0) * 20)) * 1%));
          --glow-color: hsl(320, 40%, 45%);
          --glow-color-dark: hsl(320, 40%, 35%);
        }
        
        body {
          background: #121921;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8vmin;
          flex-wrap: wrap;
          padding: 2rem;
        }
        
        .login-form {
          background: rgba(18, 25, 33, 0.9);
          padding: 3rem 2.5rem;
          border-radius: 20px;
          min-width: 320px;
          opacity: 0;
          transform: scale(0.8) translateY(20px);
          pointer-events: none;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid transparent;
          box-shadow: 0 0 0px rgba(255, 255, 255, 0);
          margin-top: 13rem;
        }
        
        .login-form.active {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: all;
          border-color: var(--glow-color);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.1), 0 0 30px var(--glow-color), inset 0 0 15px rgba(255, 255, 255, 0.05);
        }
        
        .login-form h2 {
          color: #fff;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
          text-align: center;
          text-shadow: 0 0 8px var(--glow-color);
        }
        
        .login-form .subtitle {
          color: #aaa;
          font-size: 1rem;
          margin: 0 0 2rem 0;
          text-align: center;
          text-shadow: 0 0 5px var(--glow-color);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          color: #aaa;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 5px var(--glow-color);
        }
        
        .form-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: var(--glow-color);
          box-shadow: 0 0 10px var(--glow-color);
          background: rgba(255, 255, 255, 0.08);
        }
        
        .form-group input::placeholder {
          color: #666;
        }
        
        .login-btn {
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, var(--glow-color), var(--glow-color-dark));
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          margin-top: 0.5rem;
        }
        
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), 0 0 20px var(--glow-color);
        }
        
        .login-btn:active {
          transform: translateY(0);
        }
        
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .lamp {
          display: none;
          height: 40vmin;
          overflow: visible !important;
          margin-top: 10rem;
        }
        
        .cord { stroke: var(--cord); }
        .cord--rig { display: none; }
        .lamp__tongue { fill: var(--tongue); }
        .lamp__hit { cursor: pointer; opacity: 0; }
        .lamp__feature { fill: var(--feature); }
        .lamp__stroke { stroke: var(--feature); }
        .lamp__mouth, .lamp__light { opacity: var(--on, 0); }
        .shade__opening { fill: var(--opening); }
        .shade__opening-shade { opacity: calc(1 - var(--on, 0)); }
        .post__body { fill: var(--post); }
        .base__top { fill: var(--base-top); }
        .base__side { fill: var(--base-side); }
        .top__body { fill: var(--t-3); }
      `}</style>

      <div className="min-h-screen flex items-center justify-center" style={{ background: '#121921' }}>
        <div className="container">
          <svg className="lamp" viewBox="0 0 333 484" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="lamp__shade shade">
              <ellipse className="shade__opening" cx="165" cy="220" rx="130" ry="20" />
              <ellipse className="shade__opening-shade" cx="165" cy="220" rx="130" ry="20" fill="url(#opening-shade)" />
            </g>
            <g className="lamp__base base">
              <path className="base__side" d="M165 464c44.183 0 80-8.954 80-20v-14h-22.869c-14.519-3.703-34.752-6-57.131-6-22.379 0-42.612 2.297-57.131 6H85v14c0 11.046 35.817 20 80 20z" />
              <path d="M165 464c44.183 0 80-8.954 80-20v-14h-22.869c-14.519-3.703-34.752-6-57.131-6-22.379 0-42.612 2.297-57.131 6H85v14c0 11.046 35.817 20 80 20z" fill="url(#side-shading)" />
              <ellipse className="base__top" cx="165" cy="430" rx="80" ry="20" />
              <ellipse cx="165" cy="430" rx="80" ry="20" fill="url(#base-shading)" />
            </g>
            <g className="lamp__post post">
              <path className="post__body" d="M180 142h-30v286c0 3.866 6.716 7 15 7 8.284 0 15-3.134 15-7V142z" />
              <path d="M180 142h-30v286c0 3.866 6.716 7 15 7 8.284 0 15-3.134 15-7V142z" fill="url(#post-shading)" />
            </g>
            <g className="lamp__cords cords">
              <path className="cord cord--rig" d="M124 187.033V347" strokeWidth="6" strokeLinecap="round" />
              <path className="cord cord--rig" d="M124 187.023s17.007 21.921 17.007 34.846c0 12.925-11.338 23.231-17.007 34.846-5.669 11.615-17.007 21.921-17.007 34.846 0 12.925 17.007 34.846 17.007 34.846" strokeWidth="6" strokeLinecap="round" />
              <path className="cord cord--rig" d="M124 187.017s-21.259 17.932-21.259 30.26c0 12.327 14.173 20.173 21.259 30.26 7.086 10.086 21.259 17.933 21.259 30.26 0 12.327-21.259 30.26-21.259 30.26" strokeWidth="6" strokeLinecap="round" />
              <path className="cord cord--rig" d="M124 187s29.763 8.644 29.763 20.735-19.842 13.823-29.763 20.734c-9.921 6.912-29.763 8.644-29.763 20.735S124 269.939 124 269.939" strokeWidth="6" strokeLinecap="round" />
              <path className="cord cord--rig" d="M124 187.029s-10.63 26.199-10.63 39.992c0 13.794 7.087 26.661 10.63 39.992 3.543 13.331 10.63 26.198 10.63 39.992 0 13.793-10.63 39.992-10.63 39.992" strokeWidth="6" strokeLinecap="round" />
              <path className="cord cord--rig" d="M124 187.033V347" strokeWidth="6" strokeLinecap="round" />
              <line className="cord cord--dummy" x1="124" y2="348" x2="124" y1="190" strokeWidth="6" strokeLinecap="round" />
            </g>
            <path className="lamp__light" d="M290.5 193H39L0 463.5c0 11.046 75.478 20 165.5 20s167-11.954 167-23l-42-267.5z" fill="url(#light)" />
            <g className="lamp__top top">
              <path className="top__body" fillRule="evenodd" clipRule="evenodd" d="M164.859 0c55.229 0 100 8.954 100 20l29.859 199.06C291.529 208.451 234.609 200 164.859 200S38.189 208.451 35 219.06L64.859 20c0-11.046 44.772-20 100-20z" />
              <path className="top__shading" fillRule="evenodd" clipRule="evenodd" d="M164.859 0c55.229 0 100 8.954 100 20l29.859 199.06C291.529 208.451 234.609 200 164.859 200S38.189 208.451 35 219.06L64.859 20c0-11.046 44.772-20 100-20z" fill="url(#top-shading)" />
            </g>
            <g className="lamp__face face">
              <g className="lamp__mouth">
                <path d="M165 178c19.882 0 36-16.118 36-36h-72c0 19.882 16.118 36 36 36z" fill="#141414" />
                <clipPath className="lamp__feature" id="mouth" x="129" y="142" width="72" height="36">
                  <path d="M165 178c19.882 0 36-16.118 36-36h-72c0 19.882 16.118 36 36 36z" fill="#141414" />
                </clipPath>
                <g clipPath="url(#mouth)">
                  <circle className="lamp__tongue" cx="179.4" cy="172.6" r="18" />
                </g>
              </g>
              <g className="lamp__eyes">
                <path className="lamp__eye lamp__stroke" d="M115 135c0-5.523-5.82-10-13-10s-13 4.477-13 10" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path className="lamp__eye lamp__stroke" d="M241 135c0-5.523-5.82-10-13-10s-13 4.477-13 10" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
            <defs>
              <linearGradient id="opening-shade" x1="35" y1="220" x2="295" y2="220" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="1" stopColor="var(--shade)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="base-shading" x1="85" y1="444" x2="245" y2="444" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--b-1)" />
                <stop offset="0.8" stopColor="var(--b-2)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="side-shading" x1="119" y1="430" x2="245" y2="430" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--b-3)" />
                <stop offset="1" stopColor="var(--b-4)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="post-shading" x1="150" y1="288" x2="180" y2="288" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--b-1)" />
                <stop offset="1" stopColor="var(--b-2)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="light" x1="165.5" y1="218.5" x2="165.5" y2="483.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--l-1)" stopOpacity=".2" />
                <stop offset="1" stopColor="var(--l-2)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="top-shading" x1="56" y1="110" x2="295" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--t-1)" stopOpacity=".8" />
                <stop offset="1" stopColor="var(--t-2)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle className="lamp__hit" cx="124" cy="347" r="66" fill="#C4C4C4" fillOpacity=".1" />
          </svg>

          <div className="login-form">
            <h2>Admin Login</h2>
            <p className="subtitle">Fuel Digi Blog Admin</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}