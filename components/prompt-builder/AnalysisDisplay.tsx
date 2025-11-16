'use client'

import { AnalysisResult } from '@/types/agents'
import { getAgent } from '@/lib/agents'

interface AnalysisDisplayProps {
  analysis: AnalysisResult
}

export function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  const agent = getAgent(analysis.suggestedAgent)

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{agent.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {agent.name} Selected
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 transition-all"
                style={{ width: `${analysis.confidence}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              {analysis.confidence}%
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {analysis.reasoning}
          </p>
          {analysis.refinedQuery && (
            <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-700">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Refined Query:
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {analysis.refinedQuery}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
