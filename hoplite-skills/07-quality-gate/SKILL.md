---
name: yapyep-quality-gate
description: Mandatory verification before an agent declares work complete.
---
# Quality Gate
Before done:
1. Run typecheck.
2. Run production build.
3. Run relevant tests.
4. Verify browser flow at 390px.
5. Check console/network errors.
6. Test one failure state.
7. Verify persistence for mutations.
8. Verify no secret is exposed in client bundle.
9. Report exact evidence and limitations.
A screen existing is not completion; the real user flow must work.
