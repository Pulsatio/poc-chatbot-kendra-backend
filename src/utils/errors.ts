export abstract class GenericError extends Error {
  readonly errorCode: string;
  readonly userMessage: string;
  readonly systemMessage: string;

  protected constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(systemMessage);
    this.errorCode = `ERROR_${this.getHttpStatus()}_${errorCode}`;
    this.systemMessage = systemMessage;
    this.userMessage = userMessage ?? systemMessage;

    Object.setPrototypeOf(this, GenericError.prototype);
  }

  abstract getHttpStatus(): number;
}

export class BadRequestError extends GenericError {
  getHttpStatus(): number {
    return 400;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, BadRequestError.prototype);
    this.name = this.constructor.name;
  }
}

export class UnauthorizedError extends GenericError {
  getHttpStatus(): number {
    return 401;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    this.name = this.constructor.name;
  }
}

export class ForbiddenError extends GenericError {
  getHttpStatus(): number {
    return 403;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
    this.name = this.constructor.name;
  }
}

/**
 * @description Exception error, when the user is locked
 */
export class LockedError extends GenericError {
  getHttpStatus(): number {
    return 423;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, LockedError.prototype);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends GenericError {
  getHttpStatus(): number {
    return 404;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.name = this.constructor.name;
  }
}

export class ConflictError extends GenericError {
  getHttpStatus(): number {
    return 409;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, ConflictError.prototype);
    this.name = this.constructor.name;
  }
}

export class PreconditionFailedError extends GenericError {
  getHttpStatus(): number {
    return 412;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, PreconditionFailedError.prototype);
    this.name = this.constructor.name;
  }
}

export class TooManyRequestsError extends GenericError {
  getHttpStatus(): number {
    return 429;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
    this.name = this.constructor.name;
  }
}

export class InternalServerError extends GenericError {
  getHttpStatus(): number {
    return 500;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, InternalServerError.prototype);
    this.name = this.constructor.name;
  }
}


export class UnavailableServiceError extends GenericError {
  getHttpStatus(): number {
    return 503;
  }

  constructor(errorCode: string, systemMessage: string, userMessage?: string) {
    super(errorCode, systemMessage, userMessage);

    Object.setPrototypeOf(this, InternalServerError.prototype);
    this.name = this.constructor.name;
  }
}
