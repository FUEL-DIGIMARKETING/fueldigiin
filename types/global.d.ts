declare global {
  interface Window {
    gsap: any
    MorphSVGPlugin: any
    Draggable: any
  }

  var mongoose: {
    conn: any
    promise: any
  }
}

export {}