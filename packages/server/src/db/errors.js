export class UniqueViolation extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'UniqueViolation';
    this.message = message;
    this.field = field;
  }
}
