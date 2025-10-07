const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12 px-8 text-gray-300">
      <div className="container mx-auto text-center">
        <p className="text-base">
          © {currentYear} David - Desarrollador Web Profesional. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
