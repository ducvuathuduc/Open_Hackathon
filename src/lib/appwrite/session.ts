import { AppwriteException, type Models } from "appwrite";
import { account, isAppwriteConfigured } from "./client";

export type SessionResult =
  | { ok: true; user: Models.User<Models.Preferences> }
  | { ok: false; message: string };

export async function ensureAnonymousSession(): Promise<SessionResult> {
  if (!isAppwriteConfigured) {
    return { ok: false, message: "YapYep is not connected to its secure backend yet." };
  }

  try {
    return { ok: true, user: await account.get() };
  } catch (error) {
    if (!(error instanceof AppwriteException) || error.code !== 401) {
      return { ok: false, message: "We could not connect to YapYep securely. Please try again." };
    }
  }

  try {
    await account.createAnonymousSession();
    return { ok: true, user: await account.get() };
  } catch {
    return { ok: false, message: "We could not start a secure guest session. Please try again." };
  }
}
