import { useState, useEffect, useCallback } from 'react';

function getRoute(): string {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return hash;
}

export function useRouter() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((to: string) => {
    window.location.hash = to;
  }, []);

  return { route, navigate };
}
