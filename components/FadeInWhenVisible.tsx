import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
};

export function FadeInWhenVisible({ children, delay = 0 }: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
