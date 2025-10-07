import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.title = 'David - Desarrollador Web Profesional';
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
