'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 *
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 *
 * Or with custom fallback:
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    console.error('Error caught by boundary:', error, errorInfo)

    // Call optional error handler (e.g., for error tracking service)
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // In production, send to error tracking service:
    // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 px-4">
          <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
            {/* Error Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              We&apos;re sorry for the inconvenience. Please refresh the page to try again.
            </p>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 p-4 bg-gray-50 rounded-lg text-sm">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs text-red-600 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Minimal error fallback for specific sections
 */
export function SectionErrorFallback({ sectionName = 'Section' }: { sectionName?: string }) {
  return (
    <div className="py-16 px-4">
      <div className="max-w-lg mx-auto p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800 mb-1">
              {sectionName} Error
            </h3>
            <p className="text-sm text-red-700">
              This section couldn&apos;t load properly. Please try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
