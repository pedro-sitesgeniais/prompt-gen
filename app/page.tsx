'use client'

import { useState } from 'react'
import { QueryInput } from '@/components/prompt-builder/QueryInput'
import { AnalysisDisplay } from '@/components/prompt-builder/AnalysisDisplay'
import { PromptDisplay } from '@/components/prompt-builder/PromptDisplay'
import { PromptGenerationResponse } from '@/types/agents'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PromptGenerationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGeneratePrompt = async (query: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: query }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate prompt')
      }

      const data: PromptGenerationResponse = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Claude Code Prompt Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Generate structured prompts with specialized AI agents
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <QueryInput onSubmit={handleGeneratePrompt} isLoading={isLoading} />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Analyzing your request...
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <AnalysisDisplay analysis={result.analysis} />
              <PromptDisplay prompt={result.prompt} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
