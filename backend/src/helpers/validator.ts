export class Validator {
  static isObject(v: unknown) {
    return typeof v === "object" && !Array.isArray(v) && v !== null;
  }
  static launchValidate(launch: unknown) {
    let code = 200;
    let error = "";
    if (!Validator.isObject(launch)) return { code: 400, error };
  }
}
