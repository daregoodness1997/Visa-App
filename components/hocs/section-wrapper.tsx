import React from "react";
import { AnimatePresence, motion } from "framer-motion";
interface SectionWrapperProps {
  idName: string;
}

function SectionWrapper<P>(Component: React.ComponentType, idName: string) {
  function HOC(props: P) {
    return (
      <AnimatePresence mode="wait">
        <motion.section
          id={idName}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.25 }}
          className={`max-w-7xl mx-auto relative z-0 overflow-hidden w-full my-8`}
        >
          {/* @ts-ignore */}
          <Component {...props} />
        </motion.section>
      </AnimatePresence>
    );
  }
  return HOC;
}

export default SectionWrapper;
