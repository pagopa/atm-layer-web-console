import formatValues from "../formatValues";


describe ("formatValues tests", () => {
    test('Verifica la formattazione di un valore vuoto', () => {
        expect(formatValues().checkValue(undefined)).toBe("-");
        expect(formatValues().checkEmpty(null)).toBe("");
      });
    
      test('Verifica la formattazione di due valori', () => {
        expect(formatValues().checkTwoValues("val1", "val2")).toBe("val1 - val2");
        expect(formatValues().checkTwoValues("val1", "")).toBe("val1");
        expect(formatValues().checkTwoValues("", "val2")).toBe("val2");
        expect(formatValues().checkTwoValues("", "")).toBe("-");
      });
    
      test('Verifica la formattazione di una percentuale e di una valuta', () => {
        expect(formatValues().formatPercent("50")).toBe("50%");
        expect(formatValues().formatCurrency("100")).toBe("100 €");
      });

      test('Verifica la conversione di una stringa con separatore decimale da , a . in float', () => {
        expect(formatValues().numToFloat("1.234,56")).toBe(1234.56);
        expect(formatValues().numToFloat("1")).toBe(1);
        expect(formatValues().numToFloat("")).toBe("-");
        expect(formatValues().numToFloat(null)).toBe("-");
        expect(formatValues().numToFloat(undefined)).toBe("-");
      });

      test('Verifica la formattazione di una stringa di data nel formato "gg-mm-aaaa" in "aaaa-mm-gg"', () => {
        expect(formatValues().formatStringToDate("25-06-2006")).toBe("2006-06-25");
        expect(formatValues().formatStringToDate("01-01-2022")).toBe("2022-01-01");
        expect(formatValues().formatStringToDate("")).toBe("-");
      });

      test('Verifica la formattazione di una data in una stringa nel formato "hh:mm"', () => {
        const date = new Date(2022, 0, 1, 12, 30); 
        expect(formatValues().formatDateToString(date)).toBe("01/01/2022, 12:30");
        expect(formatValues().formatDateToString("")).toBe("-");
      });

      test('Verifica la formattazione di una data per un picker', () => {
        const date = new Date(2022, 0, 1);
        expect(formatValues().formatDateForPicker(date)).toBe("1/1/2022");
      });

      test('Verifica estrazione anno da una stringa di data', () => {
        expect(formatValues().getYearFromString("25/06/2006")).toBe("2006");
        expect(formatValues().getYearFromString("01/01/2022")).toBe("2022");
        expect(formatValues().getYearFromString("")).toBeNull();
      });

      test('Verifica la formattazione di una data da "gg/mm/aaaa" a "mm/gg/aaaa"', () => {
        expect(formatValues().formatDateGbToUs("25/06/2006")).toBe("06/25/2006");
        expect(formatValues().formatDateGbToUs("01/01/2022")).toBe("01/01/2022");
        expect(formatValues().formatDateGbToUs("")).toBe("");
      });

      test('Verifica la formattazione di un importo', () => {
        expect(formatValues().formattaImporto({toString: () => "1234.56"})).toBe("1.234,56");
        expect(formatValues().formattaImporto({toString: () => "1000"})).toBe("1.000,00");
        expect(formatValues().formattaImporto({toString: () => "0.5"})).toBe("0,50");
      });
    
      test('Verifica la creazione della data', () => {

        const today = new Date();
        const expectedDateWithoutTime = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
        expect(formatValues().creaData(false)).toBe(expectedDateWithoutTime);
    
        const expectedDateWithTime = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()} ora ${String(today.getHours())}:${String(today.getMinutes()).padStart(2, "0")}`;
        expect(formatValues().creaData(true)).toBe(expectedDateWithTime);
      });

      test('Verifica la formattazione di una stringa di data', () => {
        expect(formatValues().formatDateString("20060625")).toBe("25/06/2006");
        expect(formatValues().formatDateString("invalid")).toBe("");
      });

      test('Verifica la funzione checkValue', () => {
        expect(formatValues().checkValue("value")).toBe("value");
        expect(formatValues().checkValue(123)).toBe(123);
        expect(formatValues().checkValue(null)).toBe("-");
        expect(formatValues().checkValue(undefined)).toBe("-");
      });
    
      test('Verifica la funzione checkEmpty', () => {
        expect(formatValues().checkEmpty("value")).toBe("value");
        expect(formatValues().checkEmpty("")).toBe("");
        expect(formatValues().checkEmpty(null)).toBe("");
        expect(formatValues().checkEmpty(undefined)).toBe("");
      });
    
      test('Verifica la formattazione del percentuale', () => {
        expect(formatValues().formatPercent("50")).toBe("50%");
        expect(formatValues().formatPercent("")).toBe("-");
      });
    
      test('Verifica la formattazione della valuta', () => {
        expect(formatValues().formatCurrency("100")).toBe("100 €");
        expect(formatValues().formatCurrency("")).toBe("-");
      });
    
      test('Verifica la combinazione di due valori', () => {
        expect(formatValues().checkTwoValues("value1", "value2")).toBe("value1 - value2");
        expect(formatValues().checkTwoValues("value1", "")).toBe("value1");
        expect(formatValues().checkTwoValues("", "value2")).toBe("value2");
        expect(formatValues().checkTwoValues("", "")).toBe("-");
      });

      test('Verifica la formattazione in minuscolo con valore', () => {
        expect(formatValues().checkValueToLower("HELLO")).toBe("hello");
        expect(formatValues().checkValueToLower("")).toBe("-");
      });
    
      test('Verifica la formattazione in minuscolo senza valore', () => {
        expect(formatValues().checkValueToLowerEmpty("WORLD")).toBe("world");
        expect(formatValues().checkValueToLowerEmpty("")).toBe("");
      });
    
      test('Verifica la formattazione della data', () => {
        expect(formatValues().checkFormatDate("2022-01-01")).toBe("2022/01/01");
        expect(formatValues().checkFormatDate("")).toBe("-");
      });
      
})