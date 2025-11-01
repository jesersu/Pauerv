'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setCount(count - 1)}
        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
      >
        -
      </button>

      <span className="text-2xl font-bold min-w-[3ch] text-center">
        {count}
      </span>

      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
      >
        +
      </button>

      <button
        onClick={() => setCount(0)}
        className="ml-4 px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-colors"
      >
        Reset
      </button>
    </div>
  )
}
