import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface ConsoleHeadingProps {
  command: string;
  text: string;
  className?: string;
  as?: React.ElementType;
  onTypingDone?: () => void;
  charDelay?: number;
  pauseDelay?: number;
}

export default function ConsoleHeading({
  command,
  text,
  className = '',
  as: Component = 'h2',
  onTypingDone,
  charDelay = 70,
  pauseDelay = 300,
}: ConsoleHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (isInView && !showOutput) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedCommand(command.substring(0, i + 1));
        i++;
        if (i >= command.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShowOutput(true);
            onTypingDone?.();
          }, pauseDelay);
        }
      }, charDelay);
      
      return () => clearInterval(interval);
    }
  }, [isInView, command, showOutput, onTypingDone, charDelay, pauseDelay]);

  return (
    <div ref={ref} className={`${className} font-mono flex flex-col`}>
      <div className="text-brand-accent/70 text-sm md:text-base font-normal mb-1 relative">
        <span className="invisible">{`> ${command}`}</span>
        <span className="absolute left-0 top-0 w-full">
          {`> ${displayedCommand}`}
          {!showOutput && (
            <span className="inline-block w-[0.6em] h-[1em] bg-current ml-1 align-middle animate-pulse" style={{ marginBottom: '-0.1em' }}></span>
          )}
        </span>
      </div>
      
      <Component
        className={`break-words transition-opacity duration-200 ${
          showOutput ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {text}
        <span className="inline-block w-[0.6em] h-[1em] bg-brand-primary ml-2 align-middle animate-pulse" style={{ marginBottom: '-0.1em' }}></span>
      </Component>
    </div>
  );
}
