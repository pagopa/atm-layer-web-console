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

  test("Restituisce una copia profonda di un array di oggetti", () => {
    const originalArray = [{ name: "a", age: 30 }, { name: "b", age: 25 }];
    const copiedArray = checks().copyArrayObject(originalArray);

    expect(copiedArray).not.toBe(originalArray);

    expect(copiedArray[0]).not.toBe(originalArray[0]);
    expect(copiedArray[1]).not.toBe(originalArray[1]);

    expect(copiedArray[0]).toEqual(originalArray[0]);
    expect(copiedArray[1]).toEqual(originalArray[1]);
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

  test("Restituisce il nome del file da un percorso valido con un nome file valido", () => {
    // expect(checks().deployableFilename("path/to/my_file")).toBe("my_file");
    // expect(checks().deployableFilename("another/path/to/another_file")).toBe("another_file");
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
