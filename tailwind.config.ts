import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'friv-purple': '#5B4FCF',
        'friv-blue': '#4F8CF7',
        'friv-green': '#4FD1C7',
        'friv-yellow': '#FFD93D',
        'friv-pink': '#FF6B9D',
        'friv-orange': '#FF8C42',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'friv-gradient': 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 25%, #60a5fa 50%, #07257b 75%, #1e40af 100%)',
      },
    },
  },
  // Otimizações para produção - desabilitar recursos não utilizados
  corePlugins: {
    // Manter apenas os plugins essenciais que usamos
    preflight: true,
    container: true, // NECESSÁRIO - usado para margens laterais e largura máxima
    accessibility: false,
    appearance: false,
    backdropBlur: true, // Usado no GameCard
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
    backgroundAttachment: false,
    backgroundClip: false,
    backgroundImage: true, // Usado para gradientes
    backgroundOrigin: false,
    backgroundPosition: false,
    backgroundRepeat: false,
    backgroundSize: false,
    borderCollapse: false,
    borderColor: true, // Usado nos cards
    borderOpacity: true, // Usado nos cards
    borderRadius: true, // Usado extensivamente
    borderStyle: false,
    borderWidth: true, // Usado nos cards
    boxShadow: true, // Usado nos cards
    boxSizing: true,
    cursor: true,
    display: true,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
    fill: false,
    flex: true,
    flexBasis: true,
    flexDirection: true,
    flexGrow: true,
    flexShrink: true,
    flexWrap: true,
    float: false,
    fontFamily: true,
    fontSize: true,
    fontSmoothing: true,
    fontStyle: true,
    fontVariantNumeric: false,
    fontWeight: true,
    gap: true,
    gradientColorStops: true,
    gridAutoColumns: false,
    gridAutoFlow: false,
    gridAutoRows: false,
    gridColumn: true, // Usado no layout
    gridColumnEnd: false,
    gridColumnStart: false,
    gridRow: true, // Usado no layout
    gridRowEnd: false,
    gridRowStart: false,
    gridTemplateColumns: true,
    gridTemplateRows: false,
    height: true,
    inset: true,
    justifyContent: true,
    justifyItems: false,
    justifySelf: false,
    lineHeight: true,
    margin: true,
    maxHeight: true,
    maxWidth: true, // NECESSÁRIO - usado pelo container
    minHeight: true,
    minWidth: true,
    objectFit: true,
    objectPosition: true,
    opacity: true,
    overflow: true,
    padding: true,
    position: true,
    space: true,
    textAlign: true,
    textColor: true,
    textOpacity: true,
    transform: true,
    transitionDuration: true,
    transitionProperty: true,
    transitionTimingFunction: true,
    width: true,
    zIndex: true,
  },
  plugins: [],
}
export default config 