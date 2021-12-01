import { AppError } from "./app-error";

export class MethodNotAllowedError extends AppError {
    constructor(public override originalErr?: any) {
      super(originalErr);
    }
  }