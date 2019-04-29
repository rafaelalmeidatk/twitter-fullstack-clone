export class UniqueViolation extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'UniqueViolation';
    this.message = message;
    this.field = field;
  }
}

export class InvalidOperation extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidOperation';
    this.message = message;
  }
}
