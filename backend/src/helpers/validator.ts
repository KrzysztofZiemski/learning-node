export class Validator {
  static isObject(v: unknown) {
    return typeof v === "object" && !Array.isArray(v) && v !== null;
  }

  static validate(
    data: unknown,
    scheme: Record<
      string,
      { min?: number; max?: number; date?: "date" | "later" | "earlier" }
    >
  ) {
    const invalidFields: string[] = [];

    if (!Validator.isObject(data)) {
      Object.keys(scheme).forEach((key) => invalidFields.push(key));
      return invalidFields;
    }

    const objcectData = data as object;
    type Field = keyof typeof objcectData;

    Object.entries(scheme).forEach(([key, validation]) => {
      const field = objcectData[key as Field] as unknown;
      if (!field) return invalidFields.push(key);

      if (validation.date) {
        if (!(field instanceof Date)) return invalidFields.push(key);

        const today = new Date();
        const dateField = field as Date;

        switch (validation.date) {
          case "earlier":
            if (dateField >= today) return invalidFields.push(key);
          case "later":
            if (dateField <= today) return invalidFields.push(key);
        }
      }

      if (validation.min) {
        if (typeof field !== "string" || validation.min > field.length)
          return invalidFields.push(key);
      }

      if (validation.max) {
        if (typeof field !== "string" || validation.max < field.length)
          return invalidFields.push(key);
      }
    });

    return invalidFields;
  }
}
