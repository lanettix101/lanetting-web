import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface ConsoleHeadingProps {
  command: string;
  text: string;
  className?: string;
  as?: React.ElementType;
  onTypingDone?: () => void;
}

export default function ConsoleHeading({
  command,
  text,
  className = '',
  as: Component = 'h2',
  onTypingDone,
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
          }, 300); // PAUSE TIME
        }
      }, 70); // CHAR TIME
      
      return () => clearInterval(interval);
    }
  }, [isInView, command, showOutput, onTypingDone]);

  return (
    <div ref={ref} className={`${className} font-mono flex flex-col`}>
      <div className="text-brand-accent/70 text-sm md:text-base font-normal mb-1">
        {`> ${displayedCommand}`}
        {!showOutput && (
          <span className="inline-block w-[0.6em] h-[1em] bg-current ml-1 align-middle animate-pulse" style={{ marginBottom: '-0.1em' }}></span>
        )}
      </div>
      
      {showOutput && (
        <Component className="break-words">
          {text}
          <span className="inline-block w-[0.6em] h-[1em] bg-brand-primary ml-2 align-middle animate-pulse" style={{ marginBottom: '-0.1em' }}></span>
        </Component>
      )}
    </div>
  );
}
