# Contributing to Ctrovalidate.js

First off, thank you for considering contributing to Ctrovalidate.js! Your help is greatly appreciated. This project is a community effort, and every contribution, no matter how small, is valuable.

This document provides a set of guidelines for contributing to Ctrovalidate.js. These are mostly guidelines, not strict rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Styleguides](#styleguides)
  - [Git Commit Messages](#git-commit-messages)
  - [JavaScript Styleguide](#javascript-styleguide)
- [Development Setup](#development-setup)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior. *(Note: We will need to create this file next.)*

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Ctrovalidate.js. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

Before creating a bug report, please check the existing [issues](https://github.com/ctrotech-tutor/ctrovalidate/issues) as you might find that the bug has already been reported.

When you are creating a bug report, please include as many details as possible:
- A clear and descriptive title.
- A step-by-step description of how to reproduce the issue.
- The expected behavior vs. the actual behavior.
- A minimal reproducible example (e.g., a link to a CodeSandbox or a small snippet of HTML/JS).
- The version of Ctrovalidate.js you are using and the browser(s) where you've seen the issue.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Ctrovalidate.js, including completely new features and minor improvements to existing functionality.

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description** of the suggested enhancement in as many details as possible.
- **Explain why this enhancement would be useful** to most Ctrovalidate.js users.
- **Provide a code snippet or mockups** if possible to illustrate the new feature.

### Your First Code Contribution

Unsure where to begin contributing to Ctrovalidate.js? You can start by looking through these `good-first-issue` and `help-wanted` issues:
- **Good first issues** - issues which should only require a few lines of code, and a test or two.
- **Help wanted issues** - issues which should be a bit more involved than `good-first-issue` issues.

### Pull Requests

The process described here has several goals:
- Maintain Ctrovalidate.js's quality.
- Fix problems that are important to users.
- Engage the community in working toward the best possible Ctrovalidate.js.
- Enable a sustainable system for Ctrovalidate.js's maintainers to review contributions.

Please follow these steps to have your contribution considered by the maintainers:
1. Fork the repository and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure your code lints (if a linter is configured).
4. Issue that pull request!

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move file to..." not "Moves file to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally after the first line.

### JavaScript Styleguide

All JavaScript code is expected to adhere to the style guide used in the existing codebase. We prioritize clarity, simplicity, and maintainability.

## Development Setup

Ready to contribute? Here’s how to set up Ctrovalidate.js for local development.

1.  **Fork** the repository `ctrotech-tutor/ctrovalidate`.
2.  **Clone** your forked repository:
    ```sh
    git clone https://github.com/<your-username>/ctrovalidate.git
    ```
3.  **Navigate** to the project directory:
    ```sh
    cd ctrovalidate
    ```
4.  **Install** dependencies:
    ```sh
    npm install
    ```
5.  **Run** the development server to test your changes with the `examples/simple-form.html` file:
    ```sh
    npm run dev
    ```