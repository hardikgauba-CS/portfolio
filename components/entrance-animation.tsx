'use client';

import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, useAnimation } from 'framer-motion';
import '../styles/responsive.css'; // Import CSS

export function EntranceAnimationComponent({ onComplete }: { onComplete: () => void }) {
  const [showContent, setShowContent] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (showContent) {
      controls
        .start({ opacity: 0, y: '-100vh', transition: { duration: 1.5, ease: 'easeInOut' } })
        .then(() => onComplete());
    }
  }, [showContent, controls, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center"
      animate={controls}
      initial={{ opacity: 1, y: 0 }}
    >
      <div className="responsive-container w-full h-full max-w-screen-lg max-h-screen-md bg-black rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative overflow-hidden font-mono flex flex-col items-center justify-center responsive-text">
        {/* First heading */}
        <TypeAnimation
          sequence={[
            'Hi My Name is Hardik Gauba;', 
            2000, 
            'Hi My Name is Hardik Gauba;',
            2000,
            () => { setTimeout(() => setShowContent(true), 2000); },
          ]}
          wrapper="h1"
          cursor={true}
          repeat={0}
          speed={50}
          style={{
            fontSize: '3em',
            display: 'inline-block',
            textAlign: 'center',
            width: '100%',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        />
        {/* Second heading */}
        <TypeAnimation
          sequence={[
            4000,
            'I code;',
            2000,
            'I Build AI Agents;',
            2000,
            'Lets Connect!',
            2000,
          ]}
          wrapper="h2"
          cursor={true}
          repeat={0}
          speed={50}
          style={{
            fontSize: '2em',
            display: 'inline-block',
            textAlign: 'center',
            width: '100%',
            marginTop: '1em',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        />
      </div>
    </motion.div>
  );
}
