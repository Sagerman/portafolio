import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExternalLinkIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Sitio Web Corporativo y de Productos',
      description:
        'Desarrollo de un sitio web de varias páginas para una empresa importadora de insumos gráficos. El proyecto se enfocó en un diseño moderno, animaciones interactivas y una experiencia de usuario fluida para presentar su catálogo de productos.',
      image: 'https://c.animaapp.com/mga2mgsxPclnjf/img/image_1.png',
      alt: 'Corporate website project',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Diseño Responsivo', 'Animaciones'],
      videoUrl: 'https://www.youtube.com/embed/RW0qw7KKLN8',
    },
    {
      id: 2,
      title: 'Aplicación Web de Gestión de Asistencia',
      description:
        'Desarrollo de una aplicación web completa para la gestión de asistencia. Incluye un sistema de login con roles de usuario, gestión de estudiantes (CRUD) y generación de reportes con exportación a Excel.',
      image: 'https://c.animaapp.com/mga2mgsxPclnjf/img/image.png',
      alt: 'Attendance management application',
      tags: ['React', 'TypeScript', 'Autenticación', 'UI/UX'],
      videoUrl: 'https://www.youtube.com/embed/pGXtO2kiR2o',
    },
  ];

  const handleOpenDialog = (projectId: number) => {
    setSelectedProject(projectId);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  const currentProject = projects.find((p) => p.id === selectedProject);

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-8 bg-background text-foreground">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Proyectos Destacados
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Una selección de mis trabajos más recientes que demuestran mi experiencia y pasión por
            el desarrollo web.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-card text-card-foreground border-border overflow-hidden group hover:border-primary transition-all duration-300"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-display font-semibold text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button
                  variant="outline"
                  className="w-full bg-transparent text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleOpenDialog(project.id)}
                >
                  Ver Detalles
                  <ExternalLinkIcon className="ml-2 h-4 w-4" strokeWidth={2} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={selectedProject !== null} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-4xl bg-card text-card-foreground border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold text-white">
                {currentProject?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-background to-primary/10 p-1">
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-black shadow-2xl">
                  <iframe
                    src={currentProject?.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={currentProject?.title}
                  />
                  <div className="absolute inset-0 pointer-events-none border-2 border-primary/20 rounded-lg" />
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {currentProject?.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentProject?.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;
