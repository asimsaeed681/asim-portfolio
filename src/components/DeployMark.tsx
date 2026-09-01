/**
 * Decorative accent for the contact zone: an editor window and a
 * deployed-successfully check. Adapted from unDraw's "Code Deployed"
 * (undraw.co, open license) — cropped to the editor + check, recoloured to the
 * site palette (signal blue on the panel tones). Nothing of unDraw's own visual
 * language is kept beyond these two shapes.
 */
export default function DeployMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 424 676 460" className={className} fill="none" aria-hidden="true">
      <g transform="translate(-659.66 -178.316)">
        {/* faint backing curve */}
        <path
          d="M859.288,738.456c44.833-8.177,92.738-23.965,129.2-60.961a115.558,115.558,0,0,0,31.5-55.028,108.155,108.155,0,0,0-6.477-65.3c-9.875-23.592-25.632-42.385-42.2-57.779a253.2,253.2,0,0,0-64-42.759c-49.246-23.467-101.03-35.686-151.474-53.695-24.739-8.832-49.728-18.517-72.7-33.687-19.456-12.853-40.662-30.176-51.49-55.938C609.3,260.159,662.6,228.481,692.8,216.482A393.2,393.2,0,0,1,756,198.388c4.554-.977,2.622-10.067-1.916-9.094a378.148,378.148,0,0,0-66.372,19.379c-18.211,7.566-37,17.509-51.305,34.62a72.066,72.066,0,0,0-16.283,56.346c3.789,25.5,20.258,45.154,35.727,59.388,20.454,18.822,43.776,31.115,67.422,41.135,24.91,10.553,50.336,18.778,75.761,26.845,50.8,16.121,103.883,30.486,149.741,64.788,32.081,24,75.661,68.981,64.989,124.754-4.737,24.762-19.122,44.109-34.645,58.345a201.721,201.721,0,0,1-62.046,37.733C815.447,753.526,803.762,748.585,859.288,738.456Z"
          transform="translate(248.316 125.157)"
          fill="#181a22"
        />
        {/* deployed-successfully check */}
        <g transform="translate(1173.982 602.535)">
          <circle cx="78.948" cy="78.948" r="78.948" fill="#3b5bff" />
          <path
            d="M644.088,255.176a8.78,8.78,0,0,1-7.025-3.513l-21.538-28.718a8.782,8.782,0,1,1,14.051-10.538L643.668,231.2l36.191-54.286a8.784,8.784,0,1,1,14.619,9.742L651.4,251.269a8.788,8.788,0,0,1-7.063,3.908Z"
            transform="translate(-575.914 -135.145)"
            fill="#0f1016"
          />
        </g>
        {/* editor window */}
        <g transform="translate(660 870.624)">
          <rect width="416" height="188" rx="12" transform="translate(-0.34 -0.308)" fill="#2b2e3a" />
          <rect width="416" height="26" rx="12" transform="translate(-0.34 -0.308)" fill="#20232e" />
          <g transform="translate(44.967 49.189)" fill="#3b5bff">
            <rect width="50.069" height="12.053" rx="3.565" transform="translate(63.05)" />
            <rect width="17.616" height="12.053" rx="3.565" transform="translate(268.889)" />
            <rect width="17.616" height="12.053" rx="3.565" transform="translate(304.125)" />
            <rect width="119.609" height="12.053" rx="3.565" transform="translate(130.736)" />
            <rect width="50.069" height="12.053" rx="3.565" transform="translate(0.002 77.886)" />
            <rect width="17.616" height="12.053" rx="3.565" transform="translate(205.841 77.886)" />
            <rect width="17.616" height="12.053" rx="3.565" transform="translate(241.075 77.886)" />
            <rect width="119.609" height="12.053" rx="3.565" transform="translate(67.687 77.886)" />
            <rect width="50.069" height="12.053" rx="3.565" transform="translate(206.769 26.888)" />
            <rect width="50.069" height="12.053" rx="3.565" transform="translate(0.002 26.888)" />
            <rect width="17.616" height="12.053" rx="3.565" transform="translate(0.002)" />
            <rect width="17.616" height="12.053" rx="3.565" transform="translate(0 52.85)" />
            <rect width="119.609" height="12.053" rx="3.565" transform="translate(70.468 26.888)" />
            <rect width="50.069" height="12.053" rx="3.565" transform="translate(102.921 52.85)" />
            <rect width="50.069" height="12.053" rx="3.565" transform="translate(35.234 52.85)" />
            <rect width="17.616" height="12.053" rx="3.565" transform="translate(31.569)" />
            <rect width="17.616" height="12.053" rx="3.565" transform="translate(306.906 52.85)" />
            <rect width="119.609" height="12.053" rx="3.565" transform="translate(169.679 52.85)" />
          </g>
        </g>
      </g>
    </svg>
  );
}
