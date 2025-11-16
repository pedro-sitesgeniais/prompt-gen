import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { claudeModel } from '@/lib/ai/client'
import { PromptGenerationRequest, PromptGenerationResponse } from '@/types/agents'
import { getAgent } from '@/lib/agents'
import { generateAnalyzerPrompt } from '@/lib/agents/analyzer'

const PROMPT_GENERATION_SYSTEM = `You are an expert at generating structured prompts for Claude Code.
Given a user query and context, generate a detailed, well-structured prompt following this format:

## Objetivo
[Clear, specific objective]

## Contexto do Projeto
[Stack, structure, patterns]

## Task Breakdown
1. [Detailed subtask]
2. [Detailed subtask]
...

## Constraints & Best Practices
- [Specific constraints]
- [Patterns to follow]

## Files to Focus
- [Relevant files]

## Expected Output
[Format and success criteria]

Make sure the prompt is actionable, specific, and provides all necessary context for Claude Code to succeed.`

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

    // For analyzer agent, use the dedicated function
    let generatedPrompt = ''
    if (selectedAgentType === 'analyzer') {
      generatedPrompt = generateAnalyzerPrompt({
        userQuery,
        stack: context?.stack,
        structure: context?.structure,
        patterns: context?.patterns,
      })
    } else {
      // For other agents, use Claude to generate the prompt
      const { text } = await generateText({
        model: claudeModel,
        system: PROMPT_GENERATION_SYSTEM,
        messages: [
          {
            role: 'user',
            content: `Generate a structured prompt for Claude Code based on:

User Query: ${userQuery}
Agent Type: ${selectedAgentType}
Context: ${JSON.stringify(context || {})}

Use the following agent capabilities as guidance:
${agent.capabilities.join('\n')}`,
          },
        ],
        temperature: 0.5,
      })

      generatedPrompt = text
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
