import { useEffect } from 'react';
import { Container } from './ui/Container';

interface NotFoundPageProps {
  navigate: (to: string) => void;
}

export function NotFoundPage({ navigate }: NotFoundPageProps) {
  useEffect(() => {
    document.title = 'Page Not Found — Portfolio';
  }, []);

  return (
    <Container className="flex min-h-[100dvh] items-center justify-center">
      <div className="text-center">
        <p className="mb-2 font-mono text-sm text-text-muted">
          <span className="text-danger">[X] </span>
          <span className="text-accent">command not found</span>
        </p>
        <h1 className="text-6xl font-black tracking-tight text-text-primary md:text-8xl glitch-hover">
          404
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-text-muted">
          <span className="text-text-dim">bash: </span>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 border border-accent px-6 py-3 font-mono text-sm font-medium text-accent transition-all duration-300 hover:bg-accent hover:text-bg-main"
          >
            <span className="text-accent-dim">cd</span> ~/
          </button>
        </div>
      </div>
    </Container>
  );
}
