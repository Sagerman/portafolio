import { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'projects', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileOpen(false);
  };

  const navItems = [
    { id: 'about', label: 'Sobre Mí' },
    { id: 'projects', label: 'Proyectos' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between min-h-[64px]">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-display font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
            aria-label="Ir al inicio"
          >
            David
          </button>

          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex gap-2">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuLink asChild>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`px-6 py-3 text-base font-medium transition-colors cursor-pointer rounded-md ${
                        activeSection === item.id
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-100 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                aria-label="Abrir menú"
              >
                <MenuIcon className="h-8 w-8" strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-secondary text-secondary-foreground w-[280px]">
              <div className="flex flex-col gap-6 mt-12">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-6 py-4 text-lg font-medium transition-colors cursor-pointer rounded-md ${
                      activeSection === item.id
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-100 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
