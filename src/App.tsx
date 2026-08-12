import { useEffect, useState, useCallback } from 'react';
import { useRouter } from './hooks/useRouter';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { CaseStudyPage } from './components/CaseStudyPage';
import { CvBuilder } from './components/CvBuilder';
import { NotFoundPage } from './components/NotFoundPage';
import { BootSequence } from './components/BootSequence';

export default function App() {
  const { route, navigate } = useRouter();
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);

  useEffect(() => {
    const el = document.getElementById('skeleton');
    if (el) {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.4s ease';
      setTimeout(() => el.remove(), 400);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // CV Builder gets full-screen layout (no header/footer)
  if (route === '/cv' || route === '/cv-builder') {
    return (
      <>
        {!booted && <BootSequence onComplete={handleBootComplete} />}
        <CvBuilder navigate={navigate} />
      </>
    );
  }

  let content;
  if (route === '/' || route === '') {
    content = <HomePage navigate={navigate} />;
  } else if (route.startsWith('/case-study/')) {
    content = <CaseStudyPage navigate={navigate} />;
  } else {
    content = <NotFoundPage navigate={navigate} />;
  }

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}
      <Layout navigate={navigate}>{content}</Layout>
    </>
  );
}
