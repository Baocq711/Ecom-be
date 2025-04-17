export {};

declare global {
  interface ResponseSuccessFormat<T> {
    status: number;
    message: string;
    data?: T;
  }

  interface ResponseErrorFormat {
    status: number;
    message: string | string[];
    error?: string;
  }
}
