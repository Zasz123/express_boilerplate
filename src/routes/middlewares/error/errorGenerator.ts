import { IError, ErrorTypes, CustomErrors } from "./errorTypes";

interface IErrorGenerator {
  error: IError;
  errorName: ErrorTypes;
}

export default class ErrorGenerator implements IError {
  name: IError["name"];
  message: IError["message"];
  code: IError["code"];
  stack: IError["stack"];

  constructor({ error, errorName }: IErrorGenerator) {
    const HandledError: IError | undefined =
      CustomErrors[(error.name as ErrorTypes) || errorName];
    const UnhandledError = CustomErrors["UNHANDLED_ERROR"];

    this.name =
      error.name || (HandledError && HandledError.name) || UnhandledError.name;
    this.message =
      error.message ||
      (HandledError && HandledError.message) ||
      UnhandledError.message;
    this.code =
      error.code || (HandledError && HandledError.code) || UnhandledError.code;
    this.stack = error.stack;
  }
}

export const customThrowError = ({
  name,
  message
}: {
  name: ErrorTypes;
  message?: string;
}) => {
  const error = new Error(message);
  error.name = name;
  return error;
};
