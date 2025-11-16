import { AgentConfig } from '@/types/agents'

export const debugAgent: AgentConfig = {
  type: 'debug',
  name: 'Debug Agent',
  description: 'Specialized in debugging, testing, and fixing bugs',
  icon: '🐛',
  color: 'red',
  capabilities: [
    'Bug investigation and fixing',
    'Test writing and debugging',
    'Error handling improvement',
    'Performance issue diagnosis',
    'Memory leak detection',
    'Race condition fixes',
  ],
  promptTemplate: `## Objetivo
Debug and fix the issue: {specific_objective}

## Contexto do Projeto
Stack: {stack}
Structure: {structure}
Patterns: {patterns}

## Task Breakdown
1. Reproduce the bug/issue consistently
2. Identify the root cause through debugging
3. Analyze stack traces and error logs
4. Trace code execution flow
5. Implement fix with minimal side effects
6. Add tests to prevent regression
7. Verify fix across different scenarios
8. Document the bug and solution

## Constraints & Best Practices
- Reproduce the issue before attempting fixes
- Use debugger and logging effectively
- Check for similar issues elsewhere in codebase
- Ensure fix doesn't introduce new bugs
- Add unit tests that would catch this bug
- Consider edge cases and boundary conditions
- Document why the bug occurred
- Add error handling and validation
- Check for type safety issues
- Review recent changes that might have caused the issue

## Files to Focus
{files_to_focus}

## Expected Output
Bug fix implementation including:
- Root cause analysis and explanation
- Code fix with clear comments
- Regression tests to prevent reoccurrence
- Verification that fix works in all scenarios
- Documentation of the issue and solution
- Any related improvements to prevent similar bugs
- Performance impact assessment if applicable`,
}

export function generateDebugPrompt(params: {
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
    filesToFocus = ['Files related to the bug or error'],
  } = params

  return debugAgent.promptTemplate
    .replace('{specific_objective}', specificObjective)
    .replace('{stack}', stack.join(', '))
    .replace('{structure}', structure)
    .replace('{patterns}', patterns.join(', '))
    .replace(
      '{files_to_focus}',
      filesToFocus.map((f) => `- ${f}`).join('\n')
    )
}
