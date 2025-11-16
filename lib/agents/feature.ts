import { AgentConfig } from '@/types/agents'

export const featureAgent: AgentConfig = {
  type: 'feature',
  name: 'Feature Agent',
  description: 'Specialized in creating new features, CRUD operations, and integrations',
  icon: '✨',
  color: 'purple',
  capabilities: [
    'New feature development',
    'CRUD operations implementation',
    'API integrations',
    'UI/UX component creation',
    'Database schema design',
    'Third-party service integration',
  ],
  promptTemplate: `## Objetivo
Implement a new feature to {specific_objective}

## Contexto do Projeto
Stack: {stack}
Structure: {structure}
Existing Patterns: {patterns}

## Task Breakdown
1. Design feature architecture and data flow
2. Create database schema/models if needed
3. Implement backend API endpoints or services
4. Build frontend UI components
5. Add form validation and error handling
6. Integrate with existing systems
7. Write comprehensive tests (unit + integration)
8. Add documentation and usage examples

## Constraints & Best Practices
- Follow existing project architecture and conventions
- Implement proper error handling and validation
- Use TypeScript for type safety
- Create reusable, modular components
- Follow RESTful API design or GraphQL best practices
- Implement proper authentication and authorization
- Ensure mobile-responsive design
- Write clean, self-documenting code
- Add loading states and user feedback
- Handle edge cases and error scenarios

## Files to Focus
{files_to_focus}

## Expected Output
Complete feature implementation including:
- Backend API/services with proper error handling
- Frontend UI components with responsive design
- Database migrations/schema updates
- Comprehensive test coverage
- API documentation
- User-facing documentation
- Example usage and integration guide`,
}

export function generateFeaturePrompt(params: {
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
    filesToFocus = ['Files to be created or modified for this feature'],
  } = params

  return featureAgent.promptTemplate
    .replace('{specific_objective}', specificObjective)
    .replace('{stack}', stack.join(', '))
    .replace('{structure}', structure)
    .replace('{patterns}', patterns.join(', '))
    .replace(
      '{files_to_focus}',
      filesToFocus.map((f) => `- ${f}`).join('\n')
    )
}
