# Conventional Commit Changelog Generator

Action to generate changelog from git history using conventional commits

## Example Usage

```yml
steps:
  - uses: actions/checkout@v2
    with:
      fetch-depth: 0

  - uses: seasonalmatcha/conventional-changelog-action@latest
    id: changelog
    with:
      from: v1.0.0
      to: v2.0.0
```

This will generate changelogs from `v1.0.0` to `v2.0.0`
The output can be accessed in `${{ steps.changelog.outputs.changelog }}`

### Inputs

| Input | Description                                  | Required |
| ----- | -------------------------------------------- | -------- |
| from  | Tag name or reference for the starting point | ✔        |
| to    | Tag name or reference for the ending         | ✔        |

### Outputs

| Output    | Description             |
| --------- | ----------------------- |
| changelog | The generated changelog |

### Example Output

```md
## 🚀 New Features
* add feature 1 (Seasonal Matcha)
  <details>
  <summary>Details</summary>
  <p>Add parseCommit and parseCommits functions</p>
  </details>

## 💊 Bugfixes
* **login**: fix login redirect (Seasonal Matcha)

## 💃 Styling
* Update top margin (Seasonal Matcha)
```

This work is inspired by https://github.com/dlavrenuek/conventional-changelog-action
I did reuse some of the code from the source and modify some to fit my needs
