export class ErrorResponse {
  static generate(status: number, errors: string[]) {
    switch (status) {
      case 400:
        return { error: "Invalid input Data", fields: errors.join(",") };

      case 404:
        return { error: "Not found", fields: [] };
      default:
        return { error: "Invalid input Data", fields: errors.join(",") };
    }
  }
}
