import { AgentConfig } from '@/types/agents'

export const refactorAgent: AgentConfig = {
  type: 'refactor',
  name: 'Refactor Agent',
  description: 'Specialized in code refactoring, optimization, and mobile-first improvements',
  icon: '♻️',
  color: 'green',
  capabilities: [
    'Code refactoring and cleanup',
    'Performance optimization',
    'Mobile-first conversion',
    'Code structure improvement',
    'Design pattern implementation',
    'Legacy code modernization',
  ],
  promptTemplate: `## Objetivo
Refactor and optimize the codebase to {specific_objective}

## Contexto do Projeto
Stack: {stack}
Structure: {structure}
Current Patterns: {patterns}

## Task Breakdown
1. Analyze current code structure and identify refactoring opportunities
2. Plan refactoring strategy with minimal breaking changes
3. Implement code improvements incrementally
4. Optimize performance bottlenecks
5. Ensure mobile-first responsive design
6. Update tests to reflect changes
7. Document refactoring decisions and improvements

## Constraints & Best Practices
- Maintain backward compatibility where possible
- Follow SOLID principles and clean code practices
- Prioritize readability and maintainability
- Implement incremental changes with clear commits
- Ensure all tests pass after each change
- Use modern ES6+ features and TypeScript best practices
- Optimize for mobile-first, then progressive enhancement
- Document breaking changes clearly

## Files to Focus
{files_to_focus}

## Expected Output
Refactored codebase with:
- Improved code structure and organization
- Better performance and optimization
- Mobile-first responsive implementation
- Clear documentation of changes made
- Updated tests covering refactored code
- Migration guide if breaking changes exist`,
}

export function generateRefactorPrompt(params: {
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
    filesToFocus = ['All relevant files requiring refactoring'],
  } = params

  return refactorAgent.promptTemplate
    .replace('{specific_objective}', specificObjective)
    .replace('{stack}', stack.join(', '))
    .replace('{structure}', structure)
    .replace('{patterns}', patterns.join(', '))
    .replace(
      '{files_to_focus}',
      filesToFocus.map((f) => `- ${f}`).join('\n')
    )
}
