
export interface ResponseError {
  name: string;
  message: string;
  stack?: string;
}

export interface HttpResponse {
  success: boolean;
  description?: string;
  userMessage?: string;
  error?: ResponseError;
  data?: any;
}
