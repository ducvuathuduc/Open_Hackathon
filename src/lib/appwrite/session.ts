import { AppwriteException, type Models } from "appwrite";
import { account, isAppwriteConfigured } from "./client";

export type SessionResult =
  | { ok: true; user: Models.User<Models.Preferences> }
  | { ok: false; message: string };

let bootstrap: Promise<SessionResult> | null = null;

export async function ensureAnonymousSession(): Promise<SessionResult> {
  if (!bootstrap) bootstrap = startSession();
  try {
    return await bootstrap;
  } finally {
    bootstrap = null;
  }
}

async function startSession(): Promise<SessionResult> {
  if (!isAppwriteConfigured) {
    return { ok: false, message: "YapYep is not connected to its secure backend yet." };
  }

  try {
    const user = await account.get();
    return { ok: true, user };
  } catch (error) {
    if (!(error instanceof AppwriteException) || error.code !== 401) {
      return { ok: false, message: "We could not connect to YapYep securely. Please try again." };
    }
  }

  try {
    await account.createAnonymousSession();
    const user = await account.get();
    return { ok: true, user };
  } catch {
    return { ok: false, message: "We could not start a secure guest session. Please try again." };
  }
}
