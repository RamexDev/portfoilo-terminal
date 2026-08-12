import { useEffect } from 'react';
import { useScrollToPending } from '../hooks/useScrollToPending';
import { Hero } from './Hero';
import { Works } from './Works';
import { About } from './About';
import { CertificationsAndExperience } from './CertificationsAndExperience';
import { Contact } from './Contact';

interface HomePageProps {
  navigate: (to: string) => void;
}

export function HomePage({ navigate }: HomePageProps) {
  useEffect(() => {
    document.title = 'Ramex | Fullstack Developer';
  }, []);

  useScrollToPending();

  return (
    <>
      <Hero navigate={navigate} />
      <Works navigate={navigate} />
      <About />
      <CertificationsAndExperience />
      <Contact />
    </>
  );
}
