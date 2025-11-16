import { AgentType } from './supabase'

export type { AgentType }

export interface AgentConfig {
  type: AgentType
  name: string
  description: string
  icon: string
  color: string
  capabilities: string[]
  promptTemplate: string
}

export interface AnalysisResult {
  suggestedAgent: AgentType
  confidence: number
  reasoning: string
  refinedQuery?: string
}

export interface GeneratedPrompt {
  objective: string
  context: string
  taskBreakdown: string[]
  constraints: string[]
  filesToFocus: string[]
  expectedOutput: string
}

export interface PromptGenerationRequest {
  userQuery: string
  agentType?: AgentType
  context?: {
    stack?: string[]
    structure?: string
    patterns?: string[]
  }
}

export interface PromptGenerationResponse {
  prompt: string
  agentType: AgentType
  analysis: AnalysisResult
  structured: GeneratedPrompt
}
