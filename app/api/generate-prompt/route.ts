import { NextRequest, NextResponse } from 'next/server'
import { PromptGenerationRequest, PromptGenerationResponse } from '@/types/agents'
import { getAgent } from '@/lib/agents'
import {
  generateAnalyzerPrompt,
  generateRefactorPrompt,
  generateFeaturePrompt,
  generateDebugPrompt,
  generatePlannerPrompt,
} from '@/lib/agents'

export async function POST(req: NextRequest) {
  try {
    const body: PromptGenerationRequest = await req.json()
    const { userQuery, agentType, context } = body

    if (!userQuery) {
      return NextResponse.json(
        { error: 'User query is required' },
        { status: 400 }
      )
    }

    let selectedAgentType = agentType
    let analysis = null

    // If agent type not specified, analyze the query first
    if (!selectedAgentType) {
      const analyzeResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/analyze-query`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: userQuery }),
        }
      )

      if (!analyzeResponse.ok) {
        throw new Error('Failed to analyze query')
      }

      analysis = await analyzeResponse.json()
      selectedAgentType = analysis.suggestedAgent
    }

    // Ensure we have a valid agent type
    if (!selectedAgentType) {
      return NextResponse.json(
        { error: 'Failed to determine agent type' },
        { status: 500 }
      )
    }

    const agent = getAgent(selectedAgentType)

    // Generate prompt using agent-specific function
    const promptParams = {
      userQuery,
      stack: context?.stack,
      structure: context?.structure,
      patterns: context?.patterns,
    }

    let generatedPrompt = ''
    switch (selectedAgentType) {
      case 'analyzer':
        generatedPrompt = generateAnalyzerPrompt(promptParams)
        break
      case 'refactor':
        generatedPrompt = generateRefactorPrompt(promptParams)
        break
      case 'feature':
        generatedPrompt = generateFeaturePrompt(promptParams)
        break
      case 'debug':
        generatedPrompt = generateDebugPrompt(promptParams)
        break
      case 'planner':
        generatedPrompt = generatePlannerPrompt(promptParams)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid agent type' },
          { status: 400 }
        )
    }

    // Parse the structured prompt (simplified for now)
    const structured = {
      objective: userQuery,
      context: JSON.stringify(context || {}),
      taskBreakdown: ['Task breakdown to be parsed from prompt'],
      constraints: ['Constraints to be parsed from prompt'],
      filesToFocus: ['Files to be determined'],
      expectedOutput: 'Output to be determined',
    }

    const response: PromptGenerationResponse = {
      prompt: generatedPrompt,
      agentType: selectedAgentType,
      analysis: analysis || {
        suggestedAgent: selectedAgentType,
        confidence: 100,
        reasoning: 'Agent type was explicitly specified',
      },
      structured,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error generating prompt:', error)
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    )
  }
}
