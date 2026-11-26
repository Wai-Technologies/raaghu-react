# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 2.0.x   | Yes       |
| 1.3.x   | No        |
| < 1.3   | No        |


## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Report vulnerabilities by emailing: **support@raaghu.io**

Include in your report:
- Package version affected
- Description of the vulnerability
- Steps to reproduce
- Potential impact

We aim to acknowledge reports within **3 business days** and provide a resolution or mitigation plan within **14 days**. We will credit reporters in the release notes unless you prefer to remain anonymous.

## Known vulnerabilities

The rich-text editor (`RdsCompTextEditor`) depends on `draft-js` and `react-draft-wysiwyg`. Those packages pull in advisories that have no upstream fix:

- `immutable` `<=4.3.8` (direct dependency and via `draft-js`): prototype pollution (GHSA-wf6x-7x77-mvgw), hash-collision denial of service, and List overflow denial of service.
- `linkify-it` `<=5.0.1` via `react-draft-wysiwyg`: quadratic regular-expression denial of service.

`draft-js` cannot take `immutable@5`, and there is no patched `immutable@4` release, so these are accepted for this phase. The affected surface is the editor. Do not feed it untrusted HTML that has not been sanitized.

`react-draft-wysiwyg` declares a React ≤18 peer; this package forces React 19 via `overrides` and smoke-tests typing/formatting in Storybook. Replacing `draft-js` / `react-draft-wysiwyg` with a maintained editor (e.g. TipTap or Lexical) behind the same `RdsCompTextEditor` API remains the follow-up.
