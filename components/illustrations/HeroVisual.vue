<script setup lang="ts">
// TODO: 待客戶提供實際車輛/司機照片後，可替換此處插畫為真實照片以提升信任感
// (Once the client supplies real vehicle/driver photos, swap this illustration
// for an <img alt="Sompisi Transport vehicle on route in Eswatini"> here to
// boost trust — the aspect-ratio frame below is sized so a photo can drop
// straight in without touching the surrounding layout. Update the aria-label
// below to a real alt text at the same time.)

/**
 * Entrance sequence for this illustration only. Baseline behaviour is pure
 * CSS (the `draw-path`/`draw-path-auto` classes below) and is left fully
 * intact — that's what non-JS visitors, crawlers, and reduced-motion users
 * get. When JS is available and motion is allowed, anime.js is dynamically
 * imported (only by this component, only once) to run a richer, staged
 * timeline instead: skyline → waypoint → road draw → car arrives.
 *
 * Experimental — see the `experiment/hero-animejs` branch note in the repo.
 * Scoped deliberately to the Hero illustration; every other section's
 * animation (v-reveal stagger, WhatsApp breathe, CTA glow, header blur)
 * stays CSS-only and untouched.
 */
const skylineGroup = ref<SVGGElement | null>(null)
const waypointRing = ref<SVGCircleElement | null>(null)
const roadLine = ref<SVGPathElement | null>(null)
const carGroup = ref<SVGGElement | null>(null)

onMounted(async () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return // CSS fallback stands as-is: static, fully drawn, no motion.

  // Pre-empt the CSS auto-draw and park every element at its "before
  // entrance" state synchronously, before anything async. If this waited
  // until after the anime.js import resolved, a slow/cold fetch could let
  // the CSS animation start (or finish) first, causing a visible rewind
  // once JS takes over.
  roadLine.value?.classList.remove('draw-path-auto')
  const buildings = skylineGroup.value ? (Array.from(skylineGroup.value.children) as SVGElement[]) : []
  buildings.forEach((el) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(10px)'
  })
  if (waypointRing.value) {
    waypointRing.value.style.opacity = '0'
    waypointRing.value.style.transform = 'scale(0.8)'
  }
  if (carGroup.value) {
    carGroup.value.style.transform = 'translate(58px, 298px)'
  }

  let mod: typeof import('animejs')
  try {
    // Lazy-loaded so anime.js never ships in the initial bundle and never
    // loads at all for reduced-motion visitors — only this component pulls
    // it in, and only when it's actually going to animate.
    mod = await import('animejs')
  } catch {
    // Import failed (offline, blocked request, etc). Undo the pre-entrance
    // state above so the illustration ends up static-but-visible rather
    // than stuck invisible with nothing left to animate it in.
    roadLine.value?.classList.add('draw-path-auto')
    buildings.forEach((el) => {
      el.style.opacity = ''
      el.style.transform = ''
    })
    if (waypointRing.value) {
      waypointRing.value.style.opacity = ''
      waypointRing.value.style.transform = ''
    }
    if (carGroup.value) carGroup.value.style.transform = ''
    return
  }

  const { createTimeline, createDrawable, stagger, cubicBezier } = mod
  const crispEase = cubicBezier(0.16, 1, 0.3, 1) // same signature curve as the rest of the site, no bounce/spring

  // Don't start until the loading screen (shown on every load/refresh) has
  // begun fading — otherwise this whole sequence finishes underneath that
  // opaque overlay and nobody sees it.
  const heroEntranceReady = useHeroEntranceGate()
  if (!heroEntranceReady.value) {
    await new Promise<void>((resolve) => {
      watch(heroEntranceReady, (ready) => { if (ready) resolve() }, { once: true })
    })
  }

  const tl = createTimeline({ defaults: { ease: crispEase } })

  if (buildings.length) {
    tl.add(buildings, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 500,
      delay: stagger(60)
    })
  }

  if (waypointRing.value) {
    tl.add(
      waypointRing.value,
      { opacity: [0, 1], scale: [0.8, 1], duration: 450 },
      '-=250' // overlaps the tail of the skyline stagger
    )
  }

  if (roadLine.value) {
    const [drawable] = createDrawable(roadLine.value)
    tl.add(drawable, { draw: ['0 0', '0 1'], duration: 900 }, '-=150')
  }

  if (carGroup.value) {
    tl.add(
      carGroup.value,
      { translateX: [58, 190], translateY: [298, 214], duration: 700 },
      '-=550' // car sets off while the road is still being drawn, catching up to it
    )
  }
})
</script>

<template>
  <div
    class="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink-800/15 bg-mist-50 shadow-card sm:aspect-[5/4]"
  >
    <svg
      viewBox="0 0 480 360"
      class="h-full w-full"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="Geometric illustration of a sedan travelling a straight road, city skyline in the distance"
    >
      <defs>
        <!-- Subtle duotone fills — same shapes, gentler than flat colour. -->
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#CFD2D6" />
          <stop offset="100%" stop-color="#A9AEB5" />
        </linearGradient>
        <linearGradient id="hero-road" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stop-color="#262A30" />
          <stop offset="100%" stop-color="#101216" />
        </linearGradient>
        <linearGradient id="hero-car" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#262A30" />
          <stop offset="100%" stop-color="#101216" />
        </linearGradient>
      </defs>

      <!-- ground -->
      <rect x="0" y="280" width="480" height="80" fill="#E7E7E4" />

      <!-- distant skyline, flat-roofed and rectilinear — no rolling hills -->
      <g ref="skylineGroup" fill="url(#hero-sky)">
        <rect x="18" y="216" width="38" height="64" />
        <rect x="64" y="184" width="26" height="96" />
        <rect x="98" y="230" width="42" height="50" />
        <rect x="368" y="200" width="30" height="80" />
        <rect x="404" y="168" width="24" height="112" />
        <rect x="434" y="222" width="34" height="58" />
      </g>

      <!-- distant waypoint marker: a plain ring, not a cartoon sun -->
      <circle ref="waypointRing" cx="404" cy="70" r="16" fill="none" stroke="#D97D3C" stroke-width="2.5" />

      <!-- road bed, a single precise diagonal — not a winding curve -->
      <path d="M -20 340 L 500 60" fill="none" stroke="url(#hero-road)" stroke-width="26" stroke-linecap="butt" />

      <!-- animated centre line: CSS draws this by default (draw-path-auto);
           anime.js takes over the same element when it's available, see
           script above. -->
      <path
        ref="roadLine"
        class="draw-path draw-path-auto"
        style="--draw-length: 620"
        d="M -20 340 L 500 60"
        fill="none"
        stroke="#D97D3C"
        stroke-width="3"
        stroke-linecap="butt"
        stroke-dasharray="18 14"
      />

      <!-- executive sedan silhouette riding the road. Split into an outer
           (position) / inner (fixed rotation) group so JS can animate
           translateX/Y via CSS transform without touching the rotation. -->
      <g ref="carGroup" style="transform: translate(190px, 214px)">
        <g transform="rotate(-20)">
          <path
            d="M -46,10 L -46,-2 L -24,-18 L 12,-18 L 30,-2 L 45,3 L 47,10 Z"
            fill="url(#hero-car)"
          />
          <path d="M -21,-15 L 11,-15 L 23,-3 L -23,-3 Z" fill="#3A3E45" />
          <circle cx="-27" cy="11" r="9" fill="#101216" />
          <circle cx="-27" cy="11" r="3" fill="#D97D3C" />
          <circle cx="27" cy="11" r="9" fill="#101216" />
          <circle cx="27" cy="11" r="3" fill="#D97D3C" />
        </g>
      </g>
    </svg>

    <!-- Decorative geo-tag, styled like a travel-editorial photo caption.
         Real, public country-level coordinates for Eswatini, rounded — not
         a fabricated precise location. Purely a design flourish. -->
    <span
      class="pointer-events-none absolute bottom-3 left-3 rounded bg-ink-900/70 px-2 py-1 font-mono text-[10px] tracking-wide text-mist-100/90"
    >
      26.5°S · 31.5°E — ESWATINI
    </span>
  </div>
</template>
