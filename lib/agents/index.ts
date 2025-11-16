import { AgentConfig, AgentType } from '@/types/agents'
import { analyzerAgent } from './analyzer'

// Placeholder configs for other agents (to be implemented)
const refactorAgent: AgentConfig = {
  type: 'refactor',
  name: 'Refactor Agent',
  description: 'Specialized in code refactoring and optimization',
  icon: '♻️',
  color: 'green',
  capabilities: ['Code refactoring', 'Performance optimization', 'Mobile-first conversion'],
  promptTemplate: 'To be implemented',
}

const featureAgent: AgentConfig = {
  type: 'feature',
  name: 'Feature Agent',
  description: 'Specialized in creating new features',
  icon: '✨',
  color: 'purple',
  capabilities: ['New features', 'CRUD operations', 'API integrations'],
  promptTemplate: 'To be implemented',
}

const debugAgent: AgentConfig = {
  type: 'debug',
  name: 'Debug Agent',
  description: 'Specialized in debugging and testing',
  icon: '🐛',
  color: 'red',
  capabilities: ['Bug fixes', 'Testing', 'Error handling'],
  promptTemplate: 'To be implemented',
}

const plannerAgent: AgentConfig = {
  type: 'planner',
  name: 'Planner Agent',
  description: 'Specialized in task planning and breakdown',
  icon: '📋',
  color: 'orange',
  capabilities: ['Task planning', 'Project breakdown', 'MCP integration'],
  promptTemplate: 'To be implemented',
}

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
