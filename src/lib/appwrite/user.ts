import type { Models } from "appwrite";
import { type AppError } from "./errors";
import { ensureAnonymousSession } from "./session";

export type CurrentUserResult = { ok: true; user: Models.User<Models.Preferences> } | { ok: false; error: AppError };

export async function currentUser(): Promise<CurrentUserResult> {
  const session = await ensureAnonymousSession();
  return session.ok ? { ok: true, user: session.user } : { ok: false, error: "failed" };
}
