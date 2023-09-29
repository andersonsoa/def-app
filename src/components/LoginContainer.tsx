"use client";

import { motion } from "framer-motion";

export function LoginContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: [0, 0.71, 0.2, 1.01],
        duration: 0.5,
        damping: 5,
        stiffness: 100,
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  );
}
