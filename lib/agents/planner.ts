import { AgentConfig } from '@/types/agents'

export const plannerAgent: AgentConfig = {
  type: 'planner',
  name: 'Planner Agent',
  description: 'Specialized in task planning, breakdown, and MCP integration',
  icon: '📋',
  color: 'orange',
  capabilities: [
    'Complex task breakdown',
    'Project planning and organization',
    'MCP (Model Context Protocol) integration',
    'Dependency mapping',
    'Timeline estimation',
    'Risk assessment',
  ],
  promptTemplate: `## Objetivo
Plan and organize the project: {specific_objective}

## Contexto do Projeto
Stack: {stack}
Structure: {structure}
Patterns: {patterns}

## Task Breakdown
1. Analyze project requirements and scope
2. Break down into manageable subtasks
3. Identify dependencies between tasks
4. Estimate complexity and effort for each task
5. Define success criteria and milestones
6. Plan testing and validation strategy
7. Create implementation roadmap
8. Identify potential risks and blockers

## Constraints & Best Practices
- Break tasks into small, atomic units
- Identify clear dependencies and order
- Set realistic time estimates
- Define clear acceptance criteria for each task
- Plan for testing at each stage
- Include checkpoint validation
- Consider rollback strategies
- Document assumptions and decisions
- Plan for incremental delivery
- Account for code review and iteration

## Files to Focus
{files_to_focus}

## Expected Output
Comprehensive project plan including:
- Detailed task breakdown with clear descriptions
- Dependency graph showing task relationships
- Estimated effort and timeline for each task
- Milestone markers and checkpoints
- Success criteria and validation steps
- Risk assessment and mitigation strategies
- Suggested implementation order
- Testing strategy at each phase
- Rollback/contingency plans
- Documentation requirements

## MCP Integration Notes
- Consider using MCP tools for context management
- Plan for effective prompt engineering
- Structure tasks for optimal Claude Code execution
- Define clear handoff points between tasks
- Plan for context preservation across sessions`,
}

export function generatePlannerPrompt(params: {
  userQuery: string
  stack?: string[]
  structure?: string
  patterns?: string[]
  specificObjective?: string
  filesToFocus?: string[]
}): string {
  const {
    userQuery,
    stack = ['Not specified'],
    structure = 'Not specified',
    patterns = ['Not specified'],
    specificObjective = userQuery,
    filesToFocus = ['All relevant files for the project'],
  } = params

  return plannerAgent.promptTemplate
    .replace('{specific_objective}', specificObjective)
    .replace('{stack}', stack.join(', '))
    .replace('{structure}', structure)
    .replace('{patterns}', patterns.join(', '))
    .replace(
      '{files_to_focus}',
      filesToFocus.map((f) => `- ${f}`).join('\n')
    )
}
