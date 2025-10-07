import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          alt="Abstract geometric motion background"
          src="https://c.animaapp.com/mga2mgsxPclnjf/img/ai_5.mp4"
          poster="https://c.animaapp.com/mga2mgsxPclnjf/img/ai_5-poster.png"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-8 py-32 text-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-display font-bold text-white mb-4"
        >
          David
        </h1>
        <p className="text-xl md:text-2xl font-display font-medium text-gray-300 mb-2">
          @samuelgarcia358
        </p>
        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl font-display font-medium text-primary mb-12"
        >
          Desarrollador Web Profesional
        </p>
        <div ref={ctaRef}>
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-lg font-medium"
          >
            Ver Portafolio
            <ChevronDownIcon className="ml-2 h-5 w-5" strokeWidth={2} />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDownIcon className="h-8 w-8 text-primary" strokeWidth={1.5} />
      </div>
    </section>
  );
};

export default Hero;
