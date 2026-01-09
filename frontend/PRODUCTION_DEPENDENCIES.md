# Production Dependencies

## Private NPM Packages (Commented Out for Local Dev)

**IMPORTANT**: Before deploying to production, add these dependencies back to `package.json`:

```json
{
  "dependencies": {
    "@vectord/fp-styles": "^0.2.0-alpha.66",
    "@vectord/modal": "^0.0.1-alpha.9",
    "@vectord/ui": "^1.4.6-alpha.6"
  }
}
```

### Steps to Restore for Production:

1. **Add dependencies back to `frontend/package.json`**
   - Add the three `@vectord` packages listed above to the `dependencies` section

2. **Set NPM_TOKEN environment variable**
   - These are private packages that require authentication
   - Set `NPM_TOKEN` in your `.env` file or deployment environment

3. **Revert mock imports to real packages**
   - Replace all `import ... from '../../mocks/@vectord/...'`
   - Back to `import ... from '@vectord/...'`
   - Files to update:
     - `src/components/ThankyouPage/views/SlideFlow.jsx`
     - `src/components/ThankyouPage/index.jsx`
     - `src/components/ThankyouPage/components/EventRegistrationHandler.jsx`
     - `src/components/ThankyouPage/components/EventGroup.jsx`

4. **Delete mock files**
   - Remove `src/mocks/@vectord/` directory

## Why These Were Removed for Local Dev

These packages are hosted in a private npm registry and require `NPM_TOKEN` authentication.
For local development without access to these packages, we've created mock implementations
in `src/mocks/@vectord/` that provide basic functionality.
