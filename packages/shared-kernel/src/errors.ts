/** Raised when a value object or command payload violates a domain rule. */
export class DomainValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainValidationError';
  }
}
