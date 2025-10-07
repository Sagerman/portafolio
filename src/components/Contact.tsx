import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon, SendIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 60,
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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: '',
      email: '',
      message: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const socialLinks = [
    { icon: GithubIcon, label: 'GitHub', href: 'https://github.com' },
    { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: TwitterIcon, label: 'Twitter', href: 'https://twitter.com' },
    { icon: MailIcon, label: 'Email', href: 'mailto:david@example.com' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 px-8 bg-gradient-1 text-card-foreground"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Contacto
          </h2>
          <p className="text-xl text-gray-200">
            ¿Tienes un proyecto en mente? Me encantaría escucharte.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 mb-16">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-gray-100 text-base font-medium">
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="bg-card text-card-foreground border-border focus:border-primary h-12"
              placeholder="Tu nombre"
            />
            {errors.name && <p className="text-warning text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-gray-100 text-base font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-card text-card-foreground border-border focus:border-primary h-12"
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-warning text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-3">
            <Label htmlFor="message" className="text-gray-100 text-base font-medium">
              Mensaje
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="bg-card text-card-foreground border-border focus:border-primary min-h-[160px] resize-none"
              placeholder="Cuéntame sobre tu proyecto..."
            />
            {errors.message && <p className="text-warning text-sm">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-medium"
          >
            Enviar Mensaje
            <SendIcon className="ml-2 h-5 w-5" strokeWidth={2} />
          </Button>
        </form>

        <div className="text-center">
          <h3 className="text-2xl font-display font-semibold text-white mb-8">
            Sígueme en Redes Sociales
          </h3>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-card border border-border rounded-lg flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
