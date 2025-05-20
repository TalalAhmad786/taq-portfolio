
import { motion } from "framer-motion";

const Loader = () => {
  const letters = "TAlal AHMAD".split("");
  const codeLines = [
    "const developer = {",
    "  name: 'Talal Ahmad',",
    "  role: 'Frontend Developer',",
    "  skills: ['React', 'TypeScript'],",
    "  status: 'Loading...'",
    "};",
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letterAnimation = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    show: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const terminalAnimation = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: {
        duration: 0.5,
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="relative flex flex-col items-center">
        <motion.div 
          className="w-[300px] h-[200px] bg-card border-2 border-primary rounded-lg p-4 mb-8 relative overflow-hidden"
          variants={terminalAnimation}
          initial="hidden"
          animate="visible"
        >
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="font-mono text-primary">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 }}
                className="whitespace-pre"
              >
                {line}
              </motion.div>
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-primary ml-1"
            />
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex gap-1"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterAnimation}
              className="text-4xl font-bold text-primary inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
