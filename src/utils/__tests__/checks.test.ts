import checks from "../checks";


describe("checks tests", () => {
  
  test("checkIsEmptyString restituisce true per stringhe vuote o con solo spazi", () => {
    expect(checks().checkIsEmptyString("")).toBe(true);
    expect(checks().checkIsEmptyString("   ")).toBe(true);
    expect(checks().checkIsEmptyString("  test  ")).toBe(false);
  });

  test("isObjectEmpty restituisce true se l'oggetto è vuoto, altrimenti false", () => {
    expect(checks().isObjectEmpty({})).toBe(true);
    expect(checks().isObjectEmpty({ name: "John", age: 30 })).toBe(false);
  });

  test("copyObject restituisce una copia profonda dell'oggetto", () => {
    const originalObject = { name: "John", age: 30 };
    const copiedObject = checks().copyObject(originalObject);
    expect(copiedObject).toEqual(originalObject);
    expect(copiedObject).not.toBe(originalObject);
  });

  test("regexTestField restituisce true se un campo corrisponde alla regex specificata", () => {
    expect(checks().regexTestField("test", "alphaNumeric")).toBe(true);
    expect(checks().regexTestField("test123", "alphaNumeric")).toBe(true);
    expect(checks().regexTestField("123", "alphaNumeric")).toBe(true);
    expect(checks().regexTestField("test ", "alphaNumeric")).toBe(true);
  });

  test("Restituisce true per un campo che corrisponde alla regex per numeri interi da 1 a 50", () => {
    expect(checks().regexTestField("25", "int1to50")).toBe(true);
    expect(checks().regexTestField("50", "int1to50")).toBe(true);
    expect(checks().regexTestField("100", "int1to50")).toBe(false);
    expect(checks().regexTestField("0", "int1to50")).toBe(false);
  });

  test("Restituisce true per un campo che corrisponde alla regex per i numeri float da 0 a 100", () => {
    expect(checks().regexTestField("42", "regFloat0to100")).toBe(true);
  });

  test("Restituisce true per un campo che corrisponde alla regex per numeri interi da 1 a 100", () => {
    expect(checks().regexTestField("25", "int1to100")).toBe(true);
    expect(checks().regexTestField("100", "int1to100")).toBe(true);
    expect(checks().regexTestField("101", "int1to100")).toBe(false);
    expect(checks().regexTestField("0", "int1to100")).toBe(false);
  });

  test("Restituisce true per un campo che corrisponde alla regex per numeri interi da 1 a 99", () => {
    expect(checks().regexTestField("25", "int1to99")).toBe(true);
    expect(checks().regexTestField("99", "int1to99")).toBe(true);
    expect(checks().regexTestField("100", "int1to99")).toBe(false);
    expect(checks().regexTestField("0", "int1to99")).toBe(false);
  });

  test("Restituisce true per un campo che non contiene spazi", () => {
    expect(checks().regexTestField("test", "stringWithoutSpaces")).toBe(true);
    expect(checks().regexTestField("test with spaces", "stringWithoutSpaces")).toBe(false);
  });

  test("Restituisce true per una stringa non vuota e senza spazi", () => {
    expect(checks().regexTestField("test", "stringNotEmptyNotSpaces")).toBe(true);
    expect(checks().regexTestField("  ", "stringNotEmptyNotSpaces")).toBe(false);
  });

  test("Restituisce true per un campo che corrisponde alla regex per ore e minuti nel formato HH:mm", () => {
    expect(checks().regexTestField("12:30", "oreMinuti")).toBe(true);
    expect(checks().regexTestField("24:00", "oreMinuti")).toBe(true);
    expect(checks().regexTestField("25:00", "oreMinuti")).toBe(false);
    expect(checks().regexTestField("12:60", "oreMinuti")).toBe(false);
    expect(checks().regexTestField("0:0", "oreMinuti")).toBe(false);
  });

  test("Restituisce true per un campo che corrisponde alla regex per numeri decimali con separatore", () => {
    expect(checks().regexTestField("1.234,56", "numeDecimaleConSeparatore")).toBe(true);
    expect(checks().regexTestField("-1.234,56", "numeDecimaleConSeparatore")).toBe(true);
    expect(checks().regexTestField("1234,567", "numeDecimaleConSeparatore")).toBe(false);
  });

  test("Restituisce false per un input qualsiasi quando il regType non è riconosciuto", () => {
    expect(checks().regexTestField("test", "nonEsistente")).toBe(undefined);
    expect(checks().regexTestField("123", "nonEsistente")).toBe(undefined);
    expect(checks().regexTestField("", "nonEsistente")).toBe(undefined);
  });

  test("Restituisce true per un campo che corrisponde alla regex per una data nel formato AAAA-MM-GG", () => {
    expect(checks().regexTestField("2023-12-31", "date_aaaammgg")).toBe(true);
    expect(checks().regexTestField("2023/12/31", "date_aaaammgg")).toBe(false);
    expect(checks().regexTestField("23-12-31", "date_aaaammgg")).toBe(false);
  });

  test("Restituisce true per un campo che corrisponde alla regex per un UUID", () => {
    expect(checks().regexTestField("123e4567-e89b-12d3-a456-426614174000", "uuid")).toBe(true);
    expect(checks().regexTestField("not-a-valid-uuid", "uuid")).toBe(false);
  });

  test("Restituisce una copia profonda di un array di oggetti", () => {
    const originalArray = [{ name: "a", age: 30 }, { name: "b", age: 25 }];
    const copiedArray = checks().copyArrayObject(originalArray);

    expect(copiedArray).not.toBe(originalArray);

    expect(copiedArray[0]).not.toBe(originalArray[0]);
    expect(copiedArray[1]).not.toBe(originalArray[1]);

    expect(copiedArray[0]).toEqual(originalArray[0]);
    expect(copiedArray[1]).toEqual(originalArray[1]);
  });

  test("Restituisce true per un campo che corrisponde alla regex per numeri decimali da 0.01 a 99.99", () => {
    expect(checks().regexTestField("25.75", "regFloat0_01to99_99")).toBe(true);
    expect(checks().regexTestField("99.99", "regFloat0_01to99_99")).toBe(true);
    expect(checks().regexTestField("0", "regFloat0_01to99_99")).toBe(true);
    expect(checks().regexTestField("100", "regFloat0_01to99_99")).toBe(false);
  });

  test("isInvalidField restituisce true se il campo è undefined, null, una stringa vuota o un numero negativo", () => {
    expect(checks().isInvalidField(undefined)).toBe(true);
    expect(checks().isInvalidField(null)).toBe(true);
    expect(checks().isInvalidField("")).toBe(true);
    expect(checks().isInvalidField(-5)).toBe(true);
    expect(checks().isInvalidField(0)).toBe(false);
    expect(checks().isInvalidField("test")).toBe(false);
  });

  test("isValidNumber restituisce true se una stringa rappresenta un numero intero valido", () => {
    expect(checks().isValidNumber("123")).toBe(true);
    expect(checks().isValidNumber("0")).toBe(true);
    expect(checks().isValidNumber("-5")).toBe(false);
    expect(checks().isValidNumber("test")).toBe(false);
  });

  test("isValidResourcesFilename restituisce true se il nome del file per risorse è valido", () => {
    expect(checks().isValidResourcesFilename("file_name.txt")).toBe(true);
    expect(checks().isValidResourcesFilename("my_file-name.png")).toBe(true);
    expect(checks().isValidResourcesFilename("invalid file name")).toBe(false);
  });

  test("isValidDeployableFilename restituisce true se il nome del file per il deploy è valido", () => {
    expect(checks().isValidDeployableFilename("file_name")).toBe(true);
    expect(checks().isValidDeployableFilename("my_file-name")).toBe(true);
    expect(checks().isValidDeployableFilename("invalid file name")).toBe(false);
  });

  test("Restituisce undefined per un percorso valido con un nome file non valido", () => {
    expect(checks().deployableFilename("path/to/invalid file name")).toBeUndefined();
  });

  test("Restituisce undefined per un percorso non valido", () => {
    expect(checks().deployableFilename("invalid path")).toBeUndefined();
  });

  test("Restituisce undefined per un percorso vuoto", () => {
    expect(checks().deployableFilename("")).toBeUndefined();
  });

});
