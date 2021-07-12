export interface IError extends Error {
  code: number;
}

export type ErrorTypes =
  | "NOT_FOUND"
  | "UNHANDLED_ERROR"
  | "DATABASE_ERROR"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "PERMISSION_DENIED";

export const CustomErrors: { [key in ErrorTypes]: IError } = {
  NOT_FOUND: {
    name: "NOT_FOUND",
    message: "Page not found.",
    code: 404
  },
  DATABASE_ERROR: {
    name: "DATABASE_ERROR",
    message: "Database error.",
    code: 520
  },
  UNHANDLED_ERROR: {
    name: "UNHANDLED_ERROR",
    message: "Unhandled error.",
    code: 520
  },
  PERMISSION_DENIED: {
    name: "PERMISSION_DENIED",
    message: "Permission denied.",
    code: 403
  },
  VALIDATION_ERROR: {
    name: "VALIDATION_ERROR",
    message: "Validation error. check your data.",
    code: 400
  },
  UNAUTHORIZED: {
    name: "UNAUTHORIZED",
    message: "Unauthorized. please login",
    code: 401
  }
};
