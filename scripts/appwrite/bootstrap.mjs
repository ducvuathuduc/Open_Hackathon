import { Client, Storage, TablesDB } from "node-appwrite";
import { P0_TABLES, tablePermissions } from "./schema.mjs";

const endpoint = process.env.VITE_APPWRITE_ENDPOINT;
const projectId = process.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
const bucketId = process.env.VITE_APPWRITE_TEMP_MEDIA_BUCKET_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const verifyOnly = process.argv.includes("--verify");

for (const [name, value] of Object.entries({ endpoint, projectId, databaseId, bucketId, apiKey })) {
  if (!value) throw new Error(`${name} is required. Load a local secret environment before running this command.`);
}

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
const tables = new TablesDB(client);
const storage = new Storage(client);

async function getExistingTable(tableId) {
  try {
    return await tables.getTable({ databaseId, tableId });
  } catch (error) {
    if (error?.code === 404) return null;
    throw error;
  }
}

function columnDrift(expected, existing) {
  const actual = new Map(existing.columns.map((column) => [column.key, column]));
  return expected.columns
    .map((column) => {
      const found = actual.get(column.key);
      if (!found) return `missing column ${column.key}`;
      return found.type === column.type ? null : `column ${column.key} type is ${found.type}, expected ${column.type}`;
    })
    .filter(Boolean);
}

async function ensureTable(definition) {
  const existing = await getExistingTable(definition.id);
  if (!existing) {
    if (verifyOnly) throw new Error(`Missing table: ${definition.id}`);
    await tables.createTable({
      databaseId,
      tableId: definition.id,
      name: definition.name,
      permissions: tablePermissions(definition),
      rowSecurity: definition.rowSecurity,
      columns: definition.columns,
      indexes: definition.indexes,
    });
    return "created";
  }

  const drift = columnDrift(definition, existing);
  if (drift.length) throw new Error(`${definition.id}: ${drift.join("; ")}`);
  return "verified";
}

await storage.getBucket({ bucketId });
const outcomes = await Promise.all(P0_TABLES.map(async (definition) => [definition.id, await ensureTable(definition)]));
for (const [tableId, outcome] of outcomes) console.log(`${tableId}: ${outcome}`);
