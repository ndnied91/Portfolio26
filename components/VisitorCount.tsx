'use client';
import { useEffect, useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { useMediaQuery } from 'usehooks-ts';

const VisitorCount = ({ increment = false }: { increment?: boolean }) => {
  const [count, setCount] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const fetchCount = async () => {
      const isPreview =
        window.location.hostname === 'localhost' ||
        new URLSearchParams(window.location.search).get('preview') === 'true';

      try {
        const res = await fetch(
          `/api/visitors${isPreview ? '?preview=true' : ''}`,
          {
            method: increment ? 'POST' : 'GET',
          },
        );
        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.error('Failed to fetch visitor count:', error);
      }
    };
    fetchCount();
  }, []);

  if (count === null) return null;

  return (
    <div
      className={`flex items-center gap-1.5 w-fit ${
        isMobile
          ? 'text-zinc-200 text-md'
          : 'px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-200'
      }`}
    >
      {isMobile ? (
        <span className="flex items-center gap-1.5">
          <BsEyeFill className="text-accent-cyan" size={12} />
          <span className="text-accent-cyan font-semibold">
            {count.toLocaleString()}
          </span>
          <span>visitors</span>
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <BsEyeFill className="text-accent-cyan" />
          {count.toLocaleString()}
        </span>
      )}
    </div>
  );
};

export default VisitorCount;
