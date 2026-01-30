import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TypewriterProps {
  text: string;
  delay?: number;        // ms between letters (default: 50)
  startDelay?: number;   // ms before typing starts (default: 0)
  cursor?: boolean;      // show blinking cursor (default: true)
  className?: string;
  onComplete?: () => void;
}

const Typewriter = ({
  text,
  delay = 50,
  startDelay = 0,
  cursor = true,
  className = "",
  onComplete,
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText("");
    setIsTyping(false);
    setIsComplete(false);

    // Start delay before typing begins
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, startDelay]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedText, text, delay, isTyping, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      <AnimatePresence>
        {cursor && !isComplete && (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block ml-[1px]"
          >
            |
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export { Typewriter };
export type { TypewriterProps };
