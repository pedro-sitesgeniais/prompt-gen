import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { claudeModel } from '@/lib/ai/client'
import { AnalysisResult } from '@/types/agents'

const ANALYSIS_PROMPT = `Analyze the following user query and determine which specialized agent would be best suited to handle it.

Available agents:
1. **analyzer** - Code analysis, auditing, pattern detection, security reviews
2. **refactor** - Code refactoring, optimization, mobile-first improvements
3. **feature** - New feature creation, CRUD operations, integrations
4. **debug** - Debugging, testing, bug fixes, error handling
5. **planner** - Task planning, breakdown, MCP integration, project organization

User Query: {query}

Respond with a JSON object containing:
- suggestedAgent: the agent type (analyzer|refactor|feature|debug|planner)
- confidence: confidence score 0-100
- reasoning: brief explanation of why this agent was chosen
- refinedQuery: (optional) improved version of the user's query for better results

Example response:
{
  "suggestedAgent": "feature",
  "confidence": 95,
  "reasoning": "User wants to create a new authentication system, which is a new feature",
  "refinedQuery": "Create a complete authentication system with login, register, and password reset functionality"
}`

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      )
    }

    const prompt = ANALYSIS_PROMPT.replace('{query}', query)

    const { text } = await generateText({
      model: claudeModel,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
    })

    // Parse the JSON response from Claude
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse agent analysis response')
    }

    const analysis: AnalysisResult = JSON.parse(jsonMatch[0])

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Error analyzing query:', error)
    return NextResponse.json(
      { error: 'Failed to analyze query' },
      { status: 500 }
    )
  }
}
