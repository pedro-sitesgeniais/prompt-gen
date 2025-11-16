'use client'

import { useState } from 'react'

interface PromptDisplayProps {
  prompt: string
}

export function PromptDisplay({ prompt }: PromptDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Generated Prompt for Claude Code
        </h3>
        <button
          onClick={handleCopy}
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-6">
        <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-mono">
          {prompt}
        </pre>
      </div>
    </div>
  )
}
