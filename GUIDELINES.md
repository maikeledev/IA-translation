# Guidelines for Code Modifications

## 1. Pre-Action Checklist

### Before Making Any Changes

- [ ] Verify current code functionality
- [ ] Check if the code is already working
- [ ] Identify the specific part that needs modification
- [ ] Document the current state

### Code Analysis

- [ ] Review the entire codebase context
- [ ] Check for existing tests
- [ ] Verify dependencies and imports
- [ ] Check for potential side effects

### Change Planning

- [ ] Define clear objectives
- [ ] Plan incremental changes
- [ ] Document potential risks
- [ ] Create a rollback plan

## 2. Change Implementation Rules

### Code Modifications

- Make small, focused changes
- Document each change
- Test after each modification

### Testing

- Run existing tests
- Add new tests for changes
- Verify no regressions
- Test edge cases

### Version Control

- Commit before changes
- Use descriptive commit messages
- Create feature branches
- Keep master/main stable

## 3. Communication Protocol

### Before Changes

- Explain proposed changes
- Request confirmation for major changes
- Document rationale

### During Changes

- Provide progress updates
- Document decisions
- Keep user informed

### After Changes

- Verify functionality
- Document results
- Provide next steps

## 4. Error Handling

### When Something Goes Wrong

- Revert changes immediately
- Document the issue
- Analyze root cause
- Plan a safer approach

### Recovery Plan

- Always have a rollback strategy
- Keep backup of working state
- Document recovery steps

## 5. Command Protocol

### [RG] Command

- When user writes [RG], I must:
  1. Review the guidelines
  2. Verify current state
  3. Document findings
  4. Propose next steps

### Response Format

```
[RG] Reviewing guidelines...

Current State:
- [ ] Item 1
- [ ] Item 2

Findings:
- [ ] Issue 1
- [ ] Issue 2

Proposed Next Steps:
1. Action 1
2. Action 2

Awaiting confirmation...
```
