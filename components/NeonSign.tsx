'use client';

import { useEffect, useState } from 'react';

type Props = {
  signOn: boolean;
  setSignOn: (val: boolean) => void;
};

// rest of component unchanged

const NeonSign = ({ signOn, setSignOn }: Props) => {
  const [pulling, setPulling] = useState(false);

  useEffect(() => {
    setTimeout(() => setPulling(true), 800);
    setTimeout(() => setPulling(false), 1150);
    setTimeout(() => setSignOn(true), 1200);
  }, []);

  const toggleSign = () => {
    setPulling(true);
    setTimeout(() => setPulling(false), 350);
    setSignOn(!signOn);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {/* Sign */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          border: '2px solid',
          borderRadius: '6px',
          padding: '10px 22px',
          fontFamily: 'monospace',
          fontSize: '14px',
          fontWeight: 'bold',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          transition: 'all 0.6s ease',
          color: signOn ? '#22d3ee' : '#1a3333',
          borderColor: signOn ? '#22d3ee' : '#1a3333',
          background: signOn ? 'rgba(34,211,238,0.05)' : 'transparent',
          boxShadow: signOn
            ? '0 0 10px #22d3ee, 0 0 25px #22d3ee, 0 0 50px #22d3ee, inset 0 0 15px rgba(34,211,238,0.15)'
            : 'none',
          animation: signOn ? 'crackle 5s infinite' : 'none',
        }}
      >
        <span
          style={{
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            flexShrink: 0,
            transition: 'all 0.6s ease',
            background: signOn ? '#4ade80' : '#1a3333',
            boxShadow: signOn
              ? '0 0 6px #4ade80, 0 0 14px #4ade80, 0 0 28px #4ade80'
              : 'none',
            animation: signOn ? 'pulse 1.2s infinite' : 'none',
          }}
        />
        Available for work
      </div>

      {/* Pull string */}
      <button
        onClick={toggleSign}
        tabIndex={-1}
        aria-label={
          signOn ? 'Turn off available sign' : 'Turn on available sign'
        }
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'absolute',
          right: '0px',
          top: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 0,
        }}
      >
        <div
          style={{
            width: '1px',
            height: pulling ? '30px' : '20px',
            background: 'rgba(200,180,140,0.5)',
            transition: 'height 0.15s ease',
          }}
        />
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'rgba(200,180,140,0.7)',
            boxShadow: '0 0 4px rgba(200,180,140,0.4)',
            transition: 'all 0.15s ease',
          }}
        />
      </button>

      <style>{`
        @keyframes crackle {
          0%, 89%, 100% { opacity: 1; box-shadow: 0 0 10px #22d3ee, 0 0 25px #22d3ee, 0 0 50px #22d3ee, inset 0 0 15px rgba(34,211,238,0.15); }
          90% { opacity: 0.3; box-shadow: none; }
          91% { opacity: 1; box-shadow: 0 0 10px #22d3ee; }
          92% { opacity: 0.1; box-shadow: none; }
          93% { opacity: 0.9; box-shadow: 0 0 15px #22d3ee, 0 0 35px #22d3ee, 0 0 70px #22d3ee; }
          94% { opacity: 0.2; box-shadow: none; }
          95% { opacity: 1; box-shadow: 0 0 10px #22d3ee, 0 0 25px #22d3ee, 0 0 50px #22d3ee; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 6px #4ade80, 0 0 14px #4ade80, 0 0 28px #4ade80; }
          50% { box-shadow: 0 0 3px #4ade80, 0 0 8px #4ade80; }
        }
      `}</style>
    </div>
  );
};

export default NeonSign;
