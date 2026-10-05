/* ======================================================
   HERO SLIDES
   ------------------------------------------------------------
   Four slides, one per capability the studio leads with.

   `nodes` are [longitude, latitude] pairs the globe lights up
   for that slide, so the visual changes with the message
   instead of just the text. `callouts` are the three floating
   labels rendered beside the globe.

   Slide 1's copy is overwritten from the Home CMS hero
   (see Hero.jsx), so an admin can retitle the opening slide
   without touching this file.
   ====================================================== */

export const slides = [
  {
    id: 'global',
    eyebrow: 'GLOBAL DIGITAL PRESENCE',
    title: 'Technology That Travels',
    subtitle:
      'One team, four continents, one standard. FasCave builds and runs digital products for businesses that need their technology to work everywhere.',
    author: 'FASCAVE',
    designation: 'Digital Transformation & Global Delivery',
    cta: 'START A PROJECT',
    ctaSecondary: 'OUR SERVICES',
    ctaSecondaryHref: '/features',
    backgroundWord: 'GLOBAL',
    theme: 'navy',
    nodes: [
      [-74, 40.7],
      [-0.12, 51.5],
      [77.2, 28.6],
      [103.8, 1.35],
      [139.7, 35.7],
      [151.2, -33.9],
    ],
    callouts: [
      { label: 'Global delivery', value: '4 time zones' },
      { label: 'Projects shipped', value: '150+' },
      { label: 'Active support', value: '24/7' },
    ],
  },
  {
    id: 'web',
    eyebrow: 'WEB DEVELOPMENT',
    title: 'Web Platforms, Built To Last',
    subtitle:
      'Marketing sites, portals and internal platforms on a modern, maintainable stack — fast on real networks and easy for your team to own.',
    author: 'FASCAVE',
    designation: 'Full-Stack Engineering',
    cta: 'START A PROJECT',
    ctaSecondary: 'SEE OUR WORK',
    ctaSecondaryHref: '/blog',
    backgroundWord: 'WEB',
    theme: 'indigo',
    nodes: [
      [-0.12, 51.5],
      [72.88, 19.07],
      [37.6, 55.75],
      [-118.2, 34.05],
    ],
    callouts: [
      { label: 'Core stack', value: 'React · Node' },
      { label: 'Lighthouse target', value: '95+ score' },
      { label: 'Deploy cadence', value: 'Weekly' },
    ],
  },
  {
    id: 'mobile',
    eyebrow: 'MOBILE APP DEVELOPMENT',
    title: 'Mobile Products People Keep',
    subtitle:
      'React Native and native apps engineered for offline use, real integrations and release trains you can actually trust.',
    author: 'FASCAVE',
    designation: 'Mobile Engineering',
    cta: 'START A PROJECT',
    ctaSecondary: 'OUR PROCESS',
    ctaSecondaryHref: '/about-us',
    backgroundWord: 'MOBILE',
    theme: 'steel',
    nodes: [
      [77.2, 28.6],
      [72.88, 19.07],
      [31.24, 30.04],
      [-99.13, 19.43],
    ],
    callouts: [
      { label: 'Platforms', value: 'iOS · Android' },
      { label: 'Crash-free target', value: '99.8%' },
      { label: 'Release cadence', value: 'Bi-weekly' },
    ],
  },
  {
    id: 'design',
    eyebrow: 'UI/UX & DIGITAL SOLUTIONS',
    title: 'Interfaces That Feel Obvious',
    subtitle:
      'Research, design systems and digital product work — so the software you pay for is software your customers can actually use.',
    author: 'FASCAVE',
    designation: 'Product Design & Strategy',
    cta: 'START A PROJECT',
    ctaSecondary: 'ABOUT FASCAVE',
    ctaSecondaryHref: '/about-us',
    backgroundWord: 'DESIGN',
    theme: 'deep',
    nodes: [
      [-0.12, 51.5],
      [-74, 40.7],
      [55.27, 25.2],
      [151.2, -33.9],
    ],
    callouts: [
      { label: 'Discovery to launch', value: '6–10 weeks' },
      { label: 'Design system', value: 'Reusable' },
      { label: 'Accessibility', value: 'WCAG AA' },
    ],
  },
]
