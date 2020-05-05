import { useAmp } from 'next/amp'

export const config = {
  amp: 'hybrid'
}

function HomePage() {
  const isAmp = useAmp()

  return (
    isAmp
      ? <amp-img
          width="300"
          height="300"
          src="/my-img.png"
          alt="a cool image"
          layout="responsive"
        />
      : <img
          width="300"
          height="300"
          src="/my-img.png"
          alt="a cool image"
        />
  )
}

export default HomePage;