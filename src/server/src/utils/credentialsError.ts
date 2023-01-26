export class CredentialsError implements Error {
  name: string;
  message: string;
  constructor(message: string) {
    this.name = "CredentialsError";
    this.message = message;
  }
}
