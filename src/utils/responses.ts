export function successResponse<T>(data: T, message: string, code: number) {
  return {
    data,
    message,
    code    
  }
}