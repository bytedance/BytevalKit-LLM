# Contributing to BytevalKit_LLM

Thank you for your interest in contributing to BytevalKit_LLM! We welcome and appreciate all kinds of contributions—from new evaluation tasks to model integrations and code improvements. This guide explains how to get started, where to place your changes, and how to validate them.

## Getting Started

1. **Fork** the repository on GitHub and clone your fork locally:
   ```bash
   git clone https://github.com/BytevalKit/BytevalKit_LLM.git
   cd BytevalKit_LLM
   ```

2. **Create** a feature branch:
   ```bash
   git checkout -b my-feature-branch
   ```

3. **Install** dependencies (Python ≥3.9 recommended):
   ```bash
   pip install -r requirements.txt
   ```

## Contributor License Agreement (CLA)

Before we can accept your contributions, you'll need to sign our Contributor License Agreement (CLA). This is a one-time process.

### Individual Contributors

1. When you submit a PR without having signed the CLA, you'll see a message in the PR comments
2. Click the "Contributor License Agreement" link to be redirected to the CLA page
3. Carefully read the CLA agreement and click "Sign in with GitHub to agree" at the bottom
4. Authorize the CLA assistant to access your GitHub account
5. Once complete, you'll be redirected back to your PR with confirmation that the CLA is signed

### Organization Contributors

If you're contributing on behalf of an organization:

1. An organization admin must first set up the CLA for your organization at https://cla-assistant.io/
2. Sign in with GitHub and grant access to manage your organization
3. Configure the CLA settings for your organization
4. Organization members can then be exempted from individual signing

## What to Contribute

### 1. New Evaluation Tasks

If you're adding a new evaluation task:

* **Directory**: `./tasks/<task_category>/<YourTaskName>`
* **Structure**: Follow the existing task structure conventions
* **Config**: Add a YAML configuration file under `./demo/configs/`

Submit a PR that:
* Adds the task implementation under `tasks/...`
* Includes a sample config under `demo/configs/`
* Provides documentation and usage examples
* Includes unit tests for the new task

### 2. Model Integrations

If you're adding support for a new model or deployment method:

* **Directory**: 
  * Model implementations: `./models/`
  * Model configs: `./configs/models/`
* **Requirements**: Ensure the model supports all three deployment modes (API, Huggingface, vLLM) where applicable

Submit a PR that:
* Implements the model integration following existing patterns
* Adds appropriate configuration templates
* Documents any special requirements or limitations
* Includes integration tests

### 3. Evaluation Metrics

If you're contributing new evaluation metrics:

* **Directory**: `./evaluators/`
* **Naming**: Use descriptive names (e.g., `factual_accuracy_evaluator.py`)
* **Documentation**: Include clear docstrings explaining the metric

## Code Standards

### Style Guidelines

* Follow **PEP 8** for Python code
* Use type hints for function parameters and returns
* Add comprehensive docstrings for all public functions and classes
* Keep line length under 100 characters

### Code Quality Tools

Run these tools before submitting your PR:

```bash
# Linting
flake8 .

# Formatting
black --check .

# Type checking
mypy .
```

### Commit Messages

* Use clear, descriptive commit messages
* Follow the format: `<type>: <description>`
* Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
* Example: `feat: add support for Claude-3 model evaluation`

## Testing

### Running Tests

Before submitting a PR, ensure all tests pass:

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_evaluators.py

# Run with coverage
pytest --cov=BytevalKit_LLM tests/
```

### Writing Tests

* Add tests under `tests/` mirroring your code structure
* Aim for >80% code coverage
* Include both unit tests and integration tests where applicable
* Test edge cases and error conditions

## Documentation

### Code Documentation

* Add docstrings to all functions, classes, and modules
* Use Google-style docstrings format
* Include examples in docstrings where helpful

### User Documentation

* Update README.md if adding major features
* Add detailed documentation under `docs/` for complex features
* Include usage examples and best practices

## Pull Request Process

1. **Prepare Your PR**:
   * Ensure all tests pass
   * Update documentation
   * Run code quality tools
   * Sign the CLA if you haven't already

2. **Submit Your PR**:
   * Push your feature branch to your fork
   * Open a PR against `main` with:
     * Clear title (e.g., "Add GPT-4 evaluation support")
     * Detailed description of changes
     * Any breaking changes clearly noted
     * Screenshots/examples if applicable

3. **PR Review Process**:
   * Address reviewer feedback promptly
   * Keep PR scope focused—split large changes into multiple PRs
   * Maintain backwards compatibility where possible
   * Update PR description as changes evolve

4. **After Merge**:
   * Delete your feature branch
   * Your contribution will be included in the next release
   * You'll be added to our contributors list

## Getting Help

* **Questions**: Open a discussion in GitHub Discussions
* **Bugs**: File an issue with reproduction steps
* **Feature Requests**: Open an issue with detailed use case
* **Chat**: Join our community discussions

## Recognition

We value all contributions! Contributors will be:
* Listed in our README contributors section
* Mentioned in release notes for significant contributions
* Invited to join our contributor community channels

Thank you for helping make BytevalKit_LLM better! We look forward to your contributions. 🎉