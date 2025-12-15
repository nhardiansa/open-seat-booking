import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Throttle function - limits execution frequency
 * Executes immediately on first call, then blocks subsequent calls for 'wait' ms
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null
  let lastExecuted = 0

  return function (...args: Parameters<T>) {
    const now = Date.now()
    const timeSinceLastExecuted = now - lastExecuted

    if (timeSinceLastExecuted >= wait) {
      // Execute immediately if enough time has passed
      lastExecuted = now
      func(...args)
    } else if (!timeout) {
      // Schedule execution if not already scheduled
      timeout = setTimeout(() => {
        lastExecuted = Date.now()
        func(...args)
        timeout = null
      }, wait - timeSinceLastExecuted)
    }
  }
}

/**
 * Get category color
 */
export function getCategoryColor(category: 'vip' | 'regular' | 'economy'): string {
  const colors = {
    vip: '#FFD700',
    regular: '#4A90E2',
    economy: '#95A5A6',
  }
  return colors[category]
}
