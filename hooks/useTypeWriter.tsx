import { useEffect, useState, useRef } from 'react';

export const useTypewriter = (phrases: string[], speed = 80, pause = 2000) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const isPausing = useRef(false);

  useEffect(() => {
    if (isPausing.current) return;

    const current = phrases[index];

    const timer = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, displayed.length + 1);
          setDisplayed(next);
          if (next === current) {
            isPausing.current = true;
            setTimeout(() => {
              isPausing.current = false;
              setDeleting(true);
            }, pause);
          }
        } else {
          const next = current.slice(0, displayed.length - 1);
          setDisplayed(next);
          if (next === '') {
            setDeleting(false);
            setIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timer);
  }, [displayed, deleting, index, phrases, speed, pause]);

  return displayed;
};
