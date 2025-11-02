"use client"

import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"
import { ReactNode, forwardRef } from "react"
import {
  fadeIn,
  slideIn,
  slideUp,
  scaleIn,
  staggerContainer,
  staggerItem,
  pageVariants,
  pageTransition,
  buttonVariants,
  cardVariants,
  loadingVariants,
  modalVariants,
  modalBackdropVariants,
  notificationVariants,
  chartVariants,
  inputVariants,
  skeletonVariants,
  prefersReducedMotion,
  animationConfig
} from "@/lib/animations"

// Animated Page Wrapper
interface AnimatedPageProps {
  children: ReactNode
  className?: string
}

export const AnimatedPage = ({ children, className }: AnimatedPageProps) => {
  const shouldReduceMotion = prefersReducedMotion()

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={shouldReduceMotion ? undefined : pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

// Animated Button
interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: "idle" | "hover" | "tap"
  children: ReactNode
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ variant = "idle", children, ...props }, ref) => {
    const shouldReduceMotion = prefersReducedMotion()

    return (
      <motion.button
        ref={ref}
        variants={shouldReduceMotion ? undefined : buttonVariants}
        initial="idle"
        whileHover={shouldReduceMotion ? undefined : "hover"}
        whileTap={shouldReduceMotion ? undefined : "tap"}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

AnimatedButton.displayName = "AnimatedButton"

// Animated Card
interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  hover?: boolean
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, hover = true, ...props }, ref) => {
    const shouldReduceMotion = prefersReducedMotion()

    return (
      <motion.div
        ref={ref}
        variants={shouldReduceMotion ? undefined : cardVariants}
        initial="initial"
        animate="animate"
        whileHover={hover && !shouldReduceMotion ? "hover" : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

AnimatedCard.displayName = "AnimatedCard"

// Animated Modal
interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export const AnimatedModal = ({ isOpen, onClose, children, className }: AnimatedModalProps) => {
  const shouldReduceMotion = prefersReducedMotion()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            variants={shouldReduceMotion ? undefined : modalBackdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${className}`}
            variants={shouldReduceMotion ? undefined : modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Animated Notification
interface AnimatedNotificationProps {
  isVisible: boolean
  children: ReactNode
  onClose?: () => void
  className?: string
}

export const AnimatedNotification = ({
  isVisible,
  children,
  onClose,
  className
}: AnimatedNotificationProps) => {
  const shouldReduceMotion = prefersReducedMotion()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-4 right-4 z-50 ${className}`}
          variants={shouldReduceMotion ? undefined : notificationVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={onClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Animated Input
interface AnimatedInputProps extends HTMLMotionProps<"input"> {
  error?: boolean
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ error, ...props }, ref) => {
    const shouldReduceMotion = prefersReducedMotion()

    return (
      <motion.input
        ref={ref}
        variants={shouldReduceMotion ? undefined : inputVariants}
        initial="initial"
        animate="animate"
        whileFocus={shouldReduceMotion ? undefined : "focus"}
        transition={{ type: "spring", stiffness: 300 }}
        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
        }`}
        {...props}
      />
    )
  }
)

AnimatedInput.displayName = "AnimatedInput"

// Animated Loading Spinner
interface AnimatedSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export const AnimatedSpinner = ({ size = "md", className }: AnimatedSpinnerProps) => {
  const shouldReduceMotion = prefersReducedMotion()
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  }

  return (
    <motion.div
      className={`border-2 border-gray-300 border-t-blue-500 rounded-full ${sizeClasses[size]} ${className}`}
      variants={shouldReduceMotion ? undefined : loadingVariants}
      initial="initial"
      animate="animate"
    />
  )
}

// Animated Skeleton
interface AnimatedSkeletonProps {
  className?: string
}

export const AnimatedSkeleton = ({ className }: AnimatedSkeletonProps) => {
  const shouldReduceMotion = prefersReducedMotion()

  return (
    <motion.div
      className={`bg-gray-200 rounded ${className}`}
      variants={shouldReduceMotion ? undefined : skeletonVariants}
      initial="initial"
      animate="animate"
    />
  )
}

// Animated Stagger Container
interface AnimatedStaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode
}

export const AnimatedStaggerContainer = forwardRef<HTMLDivElement, AnimatedStaggerContainerProps>(
  ({ children, ...props }, ref) => {
    const shouldReduceMotion = prefersReducedMotion()

    return (
      <motion.div
        ref={ref}
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial="initial"
        animate="animate"
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

AnimatedStaggerContainer.displayName = "AnimatedStaggerContainer"

// Animated Stagger Item
interface AnimatedStaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode
}

export const AnimatedStaggerItem = forwardRef<HTMLDivElement, AnimatedStaggerItemProps>(
  ({ children, ...props }, ref) => {
    const shouldReduceMotion = prefersReducedMotion()

    return (
      <motion.div
        ref={ref}
        variants={shouldReduceMotion ? undefined : staggerItem}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

AnimatedStaggerItem.displayName = "AnimatedStaggerItem"

// Animated Chart Container
interface AnimatedChartProps extends HTMLMotionProps<"div"> {
  children: ReactNode
}

export const AnimatedChart = forwardRef<HTMLDivElement, AnimatedChartProps>(
  ({ children, ...props }, ref) => {
    const shouldReduceMotion = prefersReducedMotion()

    return (
      <motion.div
        ref={ref}
        variants={shouldReduceMotion ? undefined : chartVariants}
        initial="initial"
        animate="animate"
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

AnimatedChart.displayName = "AnimatedChart"

// Animated Fade In
interface AnimatedFadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
}

export const AnimatedFadeIn = forwardRef<HTMLDivElement, AnimatedFadeInProps>(
  ({ children, direction = "up", delay = 0, ...props }, ref) => {
    const shouldReduceMotion = prefersReducedMotion()

    const getVariants = () => {
      switch (direction) {
        case "up":
          return slideUp
        case "down":
          return { ...slideUp, initial: { y: -20, opacity: 0 } }
        case "left":
          return slideIn
        case "right":
          return { ...slideIn, initial: { x: 20, opacity: 0 } }
        default:
          return fadeIn
      }
    }

    return (
      <motion.div
        ref={ref}
        variants={shouldReduceMotion ? undefined : getVariants()}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1], delay }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

AnimatedFadeIn.displayName = "AnimatedFadeIn"

// Animated Scale In
interface AnimatedScaleInProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  delay?: number
}

export const AnimatedScaleIn = forwardRef<HTMLDivElement, AnimatedScaleInProps>(
  ({ children, delay = 0, ...props }, ref) => {
    const shouldReduceMotion = prefersReducedMotion()

    return (
      <motion.div
        ref={ref}
        variants={shouldReduceMotion ? undefined : scaleIn}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1], delay }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

AnimatedScaleIn.displayName = "AnimatedScaleIn"

// Export all animated components
export {
  fadeIn,
  slideIn,
  slideUp,
  scaleIn,
  staggerContainer,
  staggerItem,
  pageVariants,
  pageTransition,
  buttonVariants,
  cardVariants,
  loadingVariants,
  modalVariants,
  modalBackdropVariants,
  notificationVariants,
  chartVariants,
  inputVariants,
  skeletonVariants,
  prefersReducedMotion,
  animationConfig
}
