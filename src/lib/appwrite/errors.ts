import { AppwriteException } from "appwrite";

export type AppError = "unavailable" | "unauthorized" | "forbidden" | "not_found" | "failed";

export function appError(error: unknown): AppError {
  if (!(error instanceof AppwriteException)) return "failed";
  if (error.code === 401) return "unauthorized";
  if (error.code === 403) return "forbidden";
  if (error.code === 404) return "not_found";
  if (error.code >= 500 || error.code === 0) return "unavailable";
  return "failed";
}

export function appErrorMessage(error: AppError): string {
  if (error === "unavailable") return "YapYep is temporarily unavailable. Please try again.";
  if (error === "unauthorized") return "Please restart your secure guest session.";
  if (error === "forbidden") return "You do not have access to this YapYep data.";
  if (error === "not_found") return "This YapYep data is not available yet.";
  return "We could not save this safely. Please try again.";
}
