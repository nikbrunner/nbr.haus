import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";

type Position = "top" | "left";

interface Props {
  title: string;
  position?: Position;
  children: React.ReactNode;
}

const animations = {
  top: {
    initial: { opacity: 0, y: 4, scale: 0.95, x: "-50%" },
    animate: { opacity: 1, y: 0, scale: 1, x: "-50%" },
    exit: { opacity: 0, y: 4, scale: 0.95, x: "-50%" }
  },
  left: {
    initial: { opacity: 0, x: 4, scale: 0.95, y: "-50%" },
    animate: { opacity: 1, x: 0, scale: 1, y: "-50%" },
    exit: { opacity: 0, x: 4, scale: 0.95, y: "-50%" }
  }
};

export default function Hint({ title, position = "top", children }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const anim = animations[position];

  return (
    <span
      className="Hint"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className={`Hint__tooltip Hint__tooltip--${position}`}
            initial={anim.initial}
            animate={anim.animate}
            exit={anim.exit}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
