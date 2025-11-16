import { AgentConfig, AgentType } from '@/types/agents'
import { analyzerAgent } from './analyzer'
import { refactorAgent } from './refactor'
import { featureAgent } from './feature'
import { debugAgent } from './debug'
import { plannerAgent } from './planner'

export const AGENTS: Record<AgentType, AgentConfig> = {
  analyzer: analyzerAgent,
  refactor: refactorAgent,
  feature: featureAgent,
  debug: debugAgent,
  planner: plannerAgent,
}

export function getAgent(type: AgentType): AgentConfig {
  return AGENTS[type]
}

export function getAllAgents(): AgentConfig[] {
  return Object.values(AGENTS)
}

// Export individual agents for direct access
export { analyzerAgent } from './analyzer'
export { refactorAgent } from './refactor'
export { featureAgent } from './feature'
export { debugAgent } from './debug'
export { plannerAgent } from './planner'

// Export generator functions
export { generateAnalyzerPrompt } from './analyzer'
export { generateRefactorPrompt } from './refactor'
export { generateFeaturePrompt } from './feature'
export { generateDebugPrompt } from './debug'
export { generatePlannerPrompt } from './planner'
