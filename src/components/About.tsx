import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2Icon, PaletteIcon, RocketIcon, ZapIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(contentRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { icon: Code2Icon, label: 'Desarrollo Frontend & Backend' },
    { icon: PaletteIcon, label: 'UI/UX y Responsiva' },
    { icon: RocketIcon, label: 'Optimización de Rendimiento' },
    { icon: ZapIcon, label: 'Soluciones Innovadoras' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 px-8 bg-gradient-1 text-card-foreground"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div ref={imageRef} className="flex justify-center pt-24">
            <div className="relative w-full max-w-md">
              <div className="aspect-square rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                <img
                  src="https://c.animaapp.com/mga2mgsxPclnjf/img/img-20250304-wa0006.jpg"
                  alt="Portrait of David"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{ objectPosition: '50% 10%' }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-2 rounded-full blur-3xl opacity-50" />
            </div>
          </div>

          <div ref={contentRef} className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Sobre Mí
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed">
              Soy David, un desarrollador web enfocado en crear soluciones digitales completas, desde atractivas páginas corporativas hasta robustas aplicaciones web.
            </p>
            <p className="text-lg text-gray-200 leading-relaxed">
              Mi objetivo es ser un socio tecnológico para mis clientes, utilizando herramientas modernas para construir productos funcionales, escalables y que superen las expectativas. Si tienes un proyecto en mente, me encantaría escuchar tu idea y ayudarte a hacerla realidad.
            </p>

            <div className="space-y-6 pt-8">
              <h3 className="text-2xl font-display font-semibold text-primary mb-6">
                Habilidades Principales
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-card/50 rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <skill.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <span className="text-lg font-medium text-gray-100">{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
