# Contributing to Psycholinguistics Workbook

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/psychoworkbook-frontend.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Test your changes: `npm run dev`
7. Commit your changes: `git commit -m "Description of changes"`
8. Push to your fork: `git push origin feature/your-feature-name`
9. Open a Pull Request

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Component Guidelines

- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components in appropriate directories:
  - `components/ui/` for reusable UI components
  - `components/tasks/` for task-specific components
  - `components/layout/` for layout components

## Commit Messages

Follow the conventional commits specification:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Examples:
```
feat: add lexical decision task component
fix: resolve authentication redirect loop
docs: update README with deployment instructions
```

## Testing

- Test all new features manually
- Ensure existing features still work
- Test on multiple browsers
- Test responsive design on mobile devices

## Pull Request Process

1. Update documentation if needed
2. Ensure your code follows the style guidelines
3. Write a clear PR description
4. Link related issues
5. Wait for review and address feedback

## Questions?

Open an issue or reach out to the maintainers.
