---
name: yapyep-appwrite
description: Appwrite backend and security conventions.
---
# Appwrite
Use Auth, TablesDB, Storage, Realtime and Functions according to the frozen spec.
Never expose server API keys in VITE_* variables.
Use owner/row permissions for private data.
On Free, design for one database, one bucket, and two functions. Consolidate into ai-gateway and data-worker.
Do not assume Education plan until verified in the account.
