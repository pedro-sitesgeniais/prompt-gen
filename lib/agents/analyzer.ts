import { AgentConfig } from '@/types/agents'

export const analyzerAgent: AgentConfig = {
  type: 'analyzer',
  name: 'Analyzer Agent',
  description: 'Specialized in code analysis, auditing, and pattern detection',
  icon: '🔍',
  color: 'blue',
  capabilities: [
    'Code quality analysis',
    'Security auditing',
    'Pattern detection',
    'Performance analysis',
    'Architecture review',
    'Dependency analysis',
  ],
  promptTemplate: `## Objetivo
Analyze and audit the codebase to {specific_objective}

## Contexto do Projeto
Stack: {stack}
Structure: {structure}
Patterns: {patterns}

## Task Breakdown
1. Scan codebase for {focus_area}
2. Identify patterns, anti-patterns, and issues
3. Analyze code quality and maintainability
4. Review security vulnerabilities
5. Generate comprehensive report with findings
6. Provide actionable recommendations

## Constraints & Best Practices
- Use static analysis tools when available
- Follow OWASP guidelines for security
- Consider performance implications
- Maintain backward compatibility
- Document all findings with examples
- Prioritize issues by severity

## Files to Focus
{files_to_focus}

## Expected Output
Comprehensive analysis report including:
- Executive summary of findings
- Detailed breakdown by category (security, performance, quality)
- Code examples highlighting issues
- Prioritized recommendations
- Action items with difficulty estimates`,
}

export function generateAnalyzerPrompt(params: {
  userQuery: string
  stack?: string[]
  structure?: string
  patterns?: string[]
  specificObjective?: string
  focusArea?: string
  filesToFocus?: string[]
}): string {
  const {
    userQuery,
    stack = ['Not specified'],
    structure = 'Not specified',
    patterns = ['Not specified'],
    specificObjective = userQuery,
    focusArea = 'code quality, security, and performance',
    filesToFocus = ['All relevant files in the project'],
  } = params

  return analyzerAgent.promptTemplate
    .replace('{specific_objective}', specificObjective)
    .replace('{stack}', stack.join(', '))
    .replace('{structure}', structure)
    .replace('{patterns}', patterns.join(', '))
    .replace('{focus_area}', focusArea)
    .replace(
      '{files_to_focus}',
      filesToFocus.map((f) => `- ${f}`).join('\n')
    )
}
