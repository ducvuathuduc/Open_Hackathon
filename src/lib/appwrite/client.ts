import { Account, Client, Functions, Storage, TablesDB } from "appwrite";

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

export const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID as string | undefined;
export const APPWRITE_TEMP_MEDIA_BUCKET_ID = import.meta.env.VITE_APPWRITE_TEMP_MEDIA_BUCKET_ID as
  | string
  | undefined;

export const isAppwriteConfigured = Boolean(endpoint && projectId);

const client = new Client();

if (endpoint && projectId) {
  client.setEndpoint(endpoint).setProject(projectId);
}

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
