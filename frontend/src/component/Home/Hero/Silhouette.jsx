export default function Silhouette() {
    return (
      <svg
        className="silhouette"
        viewBox="0 0 480 900"
        role="presentation"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="sil-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0a0807" />
            <stop offset="55%" stopColor="#171009" />
            <stop offset="100%" stopColor="#241409" />
          </linearGradient>
          <radialGradient id="sil-backlight" cx="0.5" cy="0.42" r="0.5">
            <stop offset="0%" stopColor="rgba(255,140,50,0.55)" />
            <stop offset="100%" stopColor="rgba(255,140,50,0)" />
          </radialGradient>
        </defs>
  
        <circle cx="248" cy="315" r="330" fill="url(#sil-backlight)" />
  
        <g fill="url(#sil-fill)">
          <ellipse cx="248" cy="118" rx="50" ry="60" />
          <rect x="226" y="168" width="44" height="44" rx="16" />
  
          <path d="M262,214
            C262,214 268,222 278,229
            C300,244 318,258 328,282
            C338,306 342,338 340,370
            C338,410 332,452 326,492
            L326,544 L160,544
            C156,498 148,452 144,410
            C141,362 144,312 156,284
            C166,258 190,240 212,229
            C220,223 226,216 226,212
            C236,207 252,207 262,214 Z" />
  
          <rect x="126" y="296" width="44" height="250" rx="22" />
          <rect x="310" y="296" width="44" height="250" rx="22" />
  
          <path d="
            M172,530 L236,530
            L224,900 L164,900 C160,760 162,630 172,530 Z" />
          <path d="
            M244,530 L308,530 L316,900 L256,900
            C266,630 258,600 244,530 Z" />
        </g>
  
        <path
          d="M226,212 C236,207 252,207 262,214"
          fill="none"
          stroke="rgba(255,160,80,0.35)"
          strokeWidth="3"
        />
        <path
          d="M238,252 L238,540"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    )
  }