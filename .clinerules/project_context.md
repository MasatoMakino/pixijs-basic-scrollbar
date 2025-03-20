# Project Context: pixijs-basic-scrollbar

## Project Overview

- Project Name: @masatomakino/pixijs-basic-scrollbar
- Description: Scrollbar modules for pixi.js
- Version: See package.json
- License: MIT

## Language Guidelines

### Use English For

- Source code and comments
- Documentation (API docs, README, etc.)
- Version control (branch names, commit messages)
- Issue tracking and pull requests
- Variable names and string literals
- Type definitions and interfaces

### Follow User's Language For

- Chat interface interactions
- Issue discussions and responses
- Pull request discussions
- Community communications

## Technology Stack

### Core Technologies

- TypeScript
- PixiJS v8.x
- TweenJS v25.x
- ES Modules format

### Development Tools

#### Required Tools

- GitHub CLI (gh)
  - Required for all development workflows
  - Used for issue and PR management
  - Required for release process

#### Build and Development Tools

- Vitest (Testing framework)
- TypeDoc (API documentation generator)
- Prettier (Code formatter)
- Browser-Sync (Development server)

## Project Structure

```
/
├── src/               # Source code
│   ├── scrollBar/     # Scrollbar implementations
│   ├── stepBar/       # Step bar implementations
│   └── index.ts       # Main entry point
├── __test__/         # Test files
├── demoSrc/          # Demo page sources
├── docs/             # Documentation
└── esm/              # Build output (ES Modules)
```

## Development Environment Setup

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Build project
npm run build

# Run tests
npm run test

# Generate coverage report
npm run coverage
```

## Version Control Strategy

This project follows the GitHub Flow branching strategy:

1. Create a branch from `main`
2. Add commits
3. Open a Pull Request
4. Review and discuss changes
5. Pass automated tests
   - GitHub Actions automatically runs tests on each PR
   - All tests must pass before merging is allowed
   - The `main` branch is protected and requires passing CI checks
6. Merge to `main`

### Special Branches

#### gh-pages

- Purpose: Hosts demo page and API documentation
- Updates automatically via GitHub Actions when main branch changes
- Contains:
  - Interactive demo pages
  - Auto-generated API reference
- **Important**: Manual updates to this branch are prohibited

### Release and Deployment Process

- This project is deployed to npm
- Releases are managed by `@masatomakino/release-helper` CLI tool
- The release process is triggered by npm version hooks:
  1. The CLI tool creates a release Pull Request
  2. After successful merge to main:
     - Version tag is automatically generated
     - Release notes draft is automatically created
  3. Package is published to npm

#### Important Restrictions

**The following manual operations are strictly prohibited:**

- Creating version tags manually
- Creating release Pull Requests manually
- Running `npm publish` command manually

Use `@masatomakino/release-helper` CLI tool for all release operations.

For detailed information about GitHub Flow, see:
[GitHub Flow Guide](https://docs.github.com/en/get-started/using-github/github-flow)

## Main Components

1. SliderView

   - Basic slider component
   - Customizable graphics elements
   - Event-based value change notification

2. ScrollBarView

   - UI component for scrollable content
   - Supports inertial scrolling
   - Mouse wheel support

3. StepBarView
   - UI component for step display
   - Supports vertical and horizontal layouts

## CI/CD

- Automated testing with GitHub Actions
- Code quality management with CodeClimate
- Auto-generated API documentation

## Important Notes

1. For PixiJS v7 and later, canvas element reference is required as pointer events are not captured in non-drawn areas
2. Always call dispose() method when removing components (to clean up Ticker references)
3. All graphic elements are customizable

## Resources

- [Demo Page](https://masatomakino.github.io/pixijs-basic-scrollbar/demo/index.html)
- [API Documentation](https://masatomakino.github.io/pixijs-basic-scrollbar/api/)
- [GitHub Repository](https://github.com/MasatoMakino/pixijs-basic-scrollbar)
