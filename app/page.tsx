"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SequentialAnimations() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // Reset and start the animation sequence
  const playAnimations = () => {
    setIsPlaying(false)
    setTimeout(() => {
      setCurrentStep(0)
      setIsPlaying(true)
    }, 300)
  }

  // Advance to the next animation step
  useEffect(() => {
    if (!isPlaying) return

    if (currentStep < 4) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [currentStep, isPlaying])

  // Animation variants for different elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{ backgroundColor: "#6DE1D2" }}>
      <h1 className="mb-8 text-3xl font-bold text-slate-800">Sequential Animations</h1>

      <Card className="relative w-full max-w-2xl p-8 mb-8 overflow-hidden">
        {/* First animation: Fade in title */}
        <AnimatePresence>
          {isPlaying && currentStep >= 0 && (
            <motion.h2
              className="mb-6 text-2xl font-semibold text-center text-slate-700"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to Animation Sequence
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Second animation: Staggered items */}
        <AnimatePresence>
          {isPlaying && currentStep >= 1 && (
            <motion.div className="mb-8" variants={containerVariants} initial="hidden" animate="visible">
              {["First", "Second", "Third"].map((item, index) => (
                <motion.div key={index} className="p-4 mb-3 bg-white rounded-lg shadow-sm" variants={itemVariants}>
                  <p className="text-slate-600">{item} item in sequence</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Third animation: Growing circle */}
        <div className="flex justify-center mb-8">
          <AnimatePresence>
            {isPlaying && currentStep >= 2 && (
              <motion.div
                className="w-24 h-24 bg-purple-500 rounded-full"
                variants={circleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Fourth animation: Text reveal */}
        <AnimatePresence>
          {isPlaying && currentStep >= 3 && (
            <motion.div
              className="p-4 text-center"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-slate-600">
                This demonstrates how to chain animations in sequence using Framer Motion. You can use techniques like
                staggered children, useEffect with state changes, and AnimatePresence to create complex animation
                sequences.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <div className="flex gap-4">
        <Button onClick={playAnimations} className="bg-purple-600 hover:bg-purple-700">
          Play Animation Sequence
        </Button>

        {isPlaying && currentStep >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="outline" onClick={() => setIsPlaying(false)}>
              Reset
            </Button>
          </motion.div>
        )}
      </div>

      {/* Animation progress indicator */}
      {isPlaying && (
        <div className="flex gap-2 mt-8">
          {[0, 1, 2, 3, 4].map((step) => (
            <motion.div
              key={step}
              className={`w-3 h-3 rounded-full ${currentStep >= step ? "bg-purple-500" : "bg-slate-200"}`}
              animate={{
                scale: currentStep === step ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.3,
                repeat: currentStep === step ? Number.POSITIVE_INFINITY : 0,
                repeatDelay: 0.5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
