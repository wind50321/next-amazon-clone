import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Banner() {
  return (
    <div className="relative">
      <div className="absolute z-20 bottom-0 w-full h-32 bg-gradient-to-t from-gray-100 to-transparent" />
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        interval={5000}
      >
        <Image
          sizes="100vw"
          width={1500}
          height={600}
          src="/images/hero-1.jpg"
          alt="banner"
          priority
        />
        <Image
          sizes="100vw"
          width={1500}
          height={600}
          src="/images/hero-2.jpg"
          alt="banner"
        />
        <Image
          sizes="100vw"
          width={1500}
          height={600}
          src="/images/hero-3.jpg"
          alt="banner"
        />
      </Carousel>
    </div>
  );
}
