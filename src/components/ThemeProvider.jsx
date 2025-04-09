"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { themeTransition } from "@/utils/animations"

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false)

  // Ensure we only render animations on the client side
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      <AnimatePresence mode="wait">
        {mounted && (
          <motion.div
            key="theme-provider"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={themeTransition}
            className="contents"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </NextThemesProvider>
  )
}
