# Contributing to Ctrovalidate

First off, thank you for considering contributing to Ctrovalidate! It's people like you that make open source such a great community. We welcome any and all contributions, from bug reports to new features and documentation improvements.

## Code of Conduct

This project and everyone participating in it is governed by the [Ctrovalidate Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior.

## How Can I Contribute?

### Reporting Bugs

- Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/ctrotech-tutor/ctrovalidate/issues ).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/ctrotech-tutor/ctrovalidate/issues/new?assignees=&labels=bug%2C+needs-triage&template=bug_report.md&title=Bug%3A+ ).
- Please be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample or a live example** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

- We use GitHub issues to track feature requests. Before you create a feature request, please check the [existing issues](https://github.com/ctrotech-tutor/ctrovalidate/issues ) to see if a similar request has already been made.
- If not, you can [open a new feature request](https://github.com/ctrotech-tutor/ctrovalidate/issues/new?assignees=&labels=enhancement%2C+needs-discussion&template=feature_request.md&title=Feat%3A+ ).

### Submitting Pull Requests

If you want to contribute code, that's fantastic! Here is the process:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-amazing-feature`).
3.  Make your changes.
4.  Set up the development environment and run tests.
5.  Ensure your code follows the project's style and linting rules.
6.  Commit your changes (`git commit -m 'feat: Add some amazing feature'`). We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/ ) specification.
7.  Push to the branch (`git push origin feature/your-amazing-feature`).
8.  Open a pull request, using the provided [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md).

## Development Setup

To get the project running locally for development, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ctrotech-tutor/ctrovalidate.git
    cd ctrovalidate
    ```

2.  **Install dependencies:**
    We use `npm` for package management.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    This will start a Vite development server. You can then navigate to the `examples/` directory in your browser to see your changes live.
    ```bash
    npm run dev
    ```

4.  **Run tests:**
    Before submitting your changes, make sure all tests pass.
    ```bash
    npm test
    ```

## Code Style

This project uses Prettier for automatic code formatting. We recommend installing a Prettier extension for your code editor to format your code automatically on save.

---

## Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). This is a specification for adding human and machine-readable meaning to commit messages. It allows us to automate changelog generation and versioning.

Your commit messages should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Common types:**
- `feat`: A new feature.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process or auxiliary tools and libraries.

**Example:**
```
feat(api): add new 'reset' method to validator
```
```
fix(rules): correct behavior of 'between' rule with negative numbers
```

---

We look forward to your contributions!
